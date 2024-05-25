import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reservation } from './schema/reservationschema';
import { CreateRservationeDto } from './dto/createReservation.dto';
import { ReservationService } from './reservation.service';

@Controller('reservation')
export class ReservationController {

    constructor (private reservationService: ReservationService){}

/* CREATE BOOKING */
@Post("/create")
@UseGuards(AuthGuard())
async createReservation(@Body() reservation:CreateRservationeDto,@Req()req):Promise <Reservation>{
try{
    const createdReservation = await this.reservationService.createReservation(reservation,req.user);
    return createdReservation;

}catch(err){
        console.log(err.message)
} 

}
@Post("/bloquerDate")
@UseGuards(AuthGuard())
async bloquerDate(@Body() reservation:CreateRservationeDto,@Req()req):Promise <Reservation>{
try{
    const createdReservation = await this.reservationService.createReservation(reservation,req.user);
    return createdReservation;

}catch(err){
        console.log(err.message)
} 

}

@Get("/blockedDates")

async getBlockedDates():Promise<Date[]>{
    try {
    const dates = await this.reservationService.findBlockedDays();
    return dates;

    }catch(error){
        throw new NotFoundException(error.message);
    }
}

@Get("/:id")
@UseGuards(AuthGuard())
async getReservation(@Param() id:string):Promise <Reservation>{
    try {
    const reservation = await this.reservationService.getReservationById(id);
    return reservation;

    }catch(error){
        throw new NotFoundException(error.message);
    }
}

@Delete("/:id")
@UseGuards(AuthGuard())
async deleteReservation(@Param() id:string):Promise <Reservation>{
try {
    const reservation = await this.reservationService.deleteReservation(id);
    return reservation;

}catch(error){
    throw new NotFoundException(error.message);
}
   
}

@Get('/countAll')
async CountReservation(){

    const numberofReservation = await this.reservationService.countAllReservations();

    if(! numberofReservation)
        {return "No reservation found" }

    else {return numberofReservation;}
    
}

@Get()
@UseGuards(AuthGuard())
async getUserRservation(@Req() req):Promise <Reservation[]>{
    const reservation = await this.reservationService.getUserReservations(req.user)
return reservation ;

}





}
