import { IsDate, IsEmpty, IsNotEmpty, IsString } from "class-validator";
import { Annonce } from "src/annonce/schema/annonceShema";
import { User } from "src/user/schemas/user.schema";

export class CreateRservationeDto {

    @IsEmpty({message: "you can not pass user id"})
    readonly userId: User ; 

    @IsEmpty({message: "you can not pass host id"})
    readonly hostId: string ;

    @IsNotEmpty({message: "you can pass annonce id"})
    readonly annonceId: string ;

    @IsNotEmpty()
    readonly totalPrice : number;

    @IsNotEmpty()
    @IsDate()
    readonly startDate : Date;

    @IsNotEmpty()
    @IsDate()
    readonly endDate : Date;
}