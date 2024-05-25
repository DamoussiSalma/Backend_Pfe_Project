import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Annonce } from './schema/annonceShema';
import * as mongoose from 'mongoose';
import * as Grid from 'gridfs-stream';
import { CreateAnnonceDto } from './dto/createAnnonce.dto';
import { User } from 'src/user/schemas/user.schema';
import { error } from 'console';
import { UpdateAnnonceDto } from './dto/updateAnnonce.dto';
//import { UpdateAnnonceDto } from './dto/updateAnnonce.dto';

Grid.mongo = mongoose.mongo;

@Injectable()

export class AnnonceService {
  

    constructor (
        @InjectModel(Annonce.name)
        private annonceModel: mongoose.Model<Annonce>
    ) {
      
    }


    async findAllAnnonces(options: { page: number; limit: number }): Promise<Annonce[]>{
      
      const { page, limit } = options;
      const skip = (page - 1) * limit;
      try {
        return await this.annonceModel.find().skip(skip)
        .limit(limit)
        .exec();

      }catch(err){
        console.log(err)
      }
    }

    async findByCategory (categorie: string, options: { page: number; limit: number }): Promise<Annonce[]>{
      const { page, limit } = options;
      const skip = (page - 1) * limit;
      try {
      return await this.annonceModel
      .find({ categorie: categorie })
      .skip(skip)
      .limit(limit)
      .exec();
    }catch(err){
      console.log(err)
    }
    }

    async countAllAnnonces( ):Promise<number>{

       return  await this.annonceModel.countDocuments();
    }

    /*Count Annonce By User Id */
    async countAnnonceByUser (user: User):Promise<number>{
      const id = user._id;
      console.log(id)
    try {
      const annonces = await this.annonceModel.find({userId : id})

      return annonces.length ;
      }catch(err){
      console.log(err)
    }
    }

    /*Get Annonce by Id*/
    async getAnnonceById(id : string): Promise<Annonce>{
        const annonce = await this.annonceModel.findById(id)
        if (!annonce) {
            throw new NotFoundException('annonce data not found!');
        }
        
        return annonce ;
    }
    
    /*Create Annonce*/
    async createAnnonce(annonce : CreateAnnonceDto,user :User): Promise<Annonce> {

        const data = Object.assign(annonce, { userId: user._id });

        const NewAnnonce = await this.annonceModel.create(data);
        

        return NewAnnonce;
      }

     /*Update Annonce*/
      async updateAnnonce(updatedAnnonce : UpdateAnnonceDto,user :User,id : string): Promise<Annonce> {
        
        const existingAnnonce= await this.annonceModel.findById(id)
        if (!existingAnnonce) {
          throw new NotFoundException('Annonce not found');
        }
    
        // Merge updatedAnnonce fields into existingAnnonce
        Object.assign(existingAnnonce, updatedAnnonce);
    
        return existingAnnonce.save();
      }

      /*delete annonce */
      async deleteAnnonce(id : string): Promise<Annonce>{
    
        return await this.annonceModel.findByIdAndDelete(id);
    }
    
    /*Get Annonces By User Id */
      async getAnnoncesByUserId(id: string): Promise<Annonce[]> {
        
        const annonces = await this.annonceModel.find({ userId: id });
        if(!annonces){
          throw new error('no data found')
        }
        return annonces;
      }

      /* accept Reservation*/
      async acceptReservation(annonceId: string): Promise<Annonce> {
        const annonce = await this.annonceModel.findById(annonceId).exec();
        if (!annonce) {
          throw new NotFoundException('Annonce non trouvée');
        }
    
        // Mettre à jour le statut de l'annonce à 'accepted'
        annonce.status = 'accepted';
        return annonce.save();
      }

      /* Cancel Reservation*/
      async cancelReservation(annonceId: string): Promise<Annonce> {
        const annonce = await this.annonceModel.findById(annonceId).exec();
        if (!annonce) {
          throw new NotFoundException('Annonce non trouvée');
        }
    
        // Mettre à jour le statut de l'annonce à 'cancelled'
        annonce.status = 'cancelled';
        return annonce.save();
      }
      
    }

