import { Controller, Get, Param, NotFoundException, Post, Body, UseGuards, Req, UseInterceptors, UploadedFiles, Patch, Put, Delete, Query, HttpStatus, BadRequestException,} from '@nestjs/common';
import { Annonce } from './schema/annonceShema';
import { AnnonceService } from './annonce.service';
import { CreateAnnonceDto } from './dto/createAnnonce.dto';
import { AuthGuard } from '@nestjs/passport';
import { FilesInterceptor } from '@nestjs/platform-express';
import { RolesGuard } from 'src/gard/role.guard';
import { RequireRoles } from 'src/decorateur/role.decorateur';
import { Role } from 'src/type/role';
import { UpdateAnnonceDto } from './dto/updateAnnonce.dto';
@Controller('annonce')
export class AnnonceController {

    constructor (private annonceService: AnnonceService){}

  /* get all annonces */
    @Get('/all')
    
    async getAllAnnonces( @Query('categorie') categorie: string,
    @Query('page') page: number = 1, // Default to page 1 if not provided
    @Query('limit') limit: number = 10, // Default limit to 10 if not provided
    ): Promise <void>{
      try {
        const options = {
          page: page,
          limit: limit,
        };
  
        let listings;
        if (categorie) {
          listings = await this.annonceService.findByCategory(categorie, options);
        } else {
          listings = await this.annonceService.findAllAnnonces(options);
        }
  
        return listings;
      } catch (err) {
        throw new NotFoundException('Fail to fetch listings', err.message);
      }
    }
        
    
  /* count all annonces */
    @Get('/count')
    async CountAllAnnonces(): Promise <number>{
      const count=await this.annonceService.countAllAnnonces();
      return count ;
    }

  /* count annonces of current user */
    @Get('/countbyuser')
    @UseGuards(AuthGuard())
    async CountAnoncesByUserId( @Req() req): Promise <number>{
        
      console.log(req.user)
      try { 
        const count=await this.annonceService.countAnnonceByUser(req.user);
        return count 
      }catch (err)
      {console.log(err)}
    }

    /*get annonce by id*/
    @Get(':id')
    async getAnnonceById(@Param('id') id: string) {
      
      try {

        const annonce = await this.annonceService.getAnnonceById(id);
        return annonce;
      } catch (error) {
        throw new NotFoundException(error.message);
      }
    }

    /*@Protected route*/
    @Post('/create')
    @UseGuards(AuthGuard())
    @UseInterceptors(FilesInterceptor('images',6))
    async createAnnonce(@Body() annonce: CreateAnnonceDto , @UploadedFiles() images,  @Req() req) :Promise <Annonce>{
      
      annonce.images = images.map(image => `http://localhost:3000/uploads/${image.filename}`)
      //console.log(req.user);
      const createdAnnonce = await this.annonceService.createAnnonce(annonce,req.user);
      return createdAnnonce;
    }

    @Put('/update/:id')
    @UseGuards(AuthGuard())
    @UseInterceptors(FilesInterceptor('images', 4))
    async updateAnnonce(
      @Param('id') id: string,
      @Body() annonce: UpdateAnnonceDto,
      @UploadedFiles() images,
      @Req() req,
    ): Promise<Annonce> {
      // Fetch the existing annonce to ensure it exists and to get current images
      const existingAnnonce = await this.annonceService.getAnnonceById(id);
      if (!existingAnnonce) {
        throw new NotFoundException(`Annonce with ID ${id} not found`);
      }
  
  
      // If new images are uploaded, update the images field, else keep the current images
      if (images && images.length > 0) {
        console.log('New images uploaded:', images);
        annonce.images = images.map(image => `http://localhost:3000/uploads/uploads/${image.filename}`);
      } else {
        annonce.images = existingAnnonce.images;
      }
  
      try {
        const updatedAnnonce = await this.annonceService.updateAnnonce(annonce, req.user, id);
        return updatedAnnonce;
      } catch (error) {
        console.error('Error updating annonce:', error);
        throw new BadRequestException('Error updating annonce');
      }
    }

    @Delete(':id')
    @UseGuards(AuthGuard())
    async deleteAnnonce(@Param('id') id : string) :Promise <Annonce>{
    
      //console.log(req.user);
      const deleteAnnonce = await this.annonceService.deleteAnnonce(id);
      return deleteAnnonce;
    }

    @Get('/user/:id')
    @UseGuards(AuthGuard(),RolesGuard)
    @RequireRoles(Role.Admin)
    async getAnnoncebyUserId(@Param('id') id: string): Promise<Annonce[]>{
      try{

        const annonces= await this.annonceService.getAnnoncesByUserId(id)
        return annonces;

      }catch(err){console.log(err)}
    }

    @Get()
    @UseGuards(AuthGuard())
    async getAnnonceOfCurrentUser(@Req() req): Promise <Annonce[]>{
      const userId = req.user._id
      try { return this.annonceService.getAnnoncesByUserId(userId);
  
      } catch (error) {
        throw new NotFoundException(error.message);
      }
    }

  

    @Patch(':id/accept')
    @UseGuards(AuthGuard(),RolesGuard)
    @RequireRoles(Role.Admin)
    async updateAnnonceStatut(@Param('id') AnnonceId: string):Promise <Annonce>{
      try{
       
          return this.annonceService.acceptReservation(AnnonceId);

        } catch (error) {
          throw new NotFoundException(error.message);
        }

    }


    @Patch(':id/cancel')
    @UseGuards(AuthGuard(),RolesGuard)
    @RequireRoles(Role.Admin)
    async updateStatut(@Param('id') AnnonceId: string):Promise <Annonce>{
      try{
       
          return this.annonceService.cancelReservation(AnnonceId);

        } catch (error) {
          throw new NotFoundException(error.message);
        }

    }

 

    
}
