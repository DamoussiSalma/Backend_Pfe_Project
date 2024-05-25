import { IsArray, IsEmpty, IsNotEmpty, IsString,IsInt } from "class-validator";
import { User } from "src/user/schemas/user.schema";

export class CreateAnnonceDto {
        
    @IsNotEmpty()
    @IsString()
    readonly categorie:string;

    @IsNotEmpty()
    @IsString()
    readonly type: string;

    @IsNotEmpty()
    @IsString()
    readonly adresse: string;

    @IsNotEmpty()
    @IsString()
    readonly ville: string;

    @IsNotEmpty()
    readonly nbGuest: number;
    
    @IsNotEmpty()
    readonly nbChambre: number;
    
    @IsNotEmpty()    
    readonly nbBed: number;
  

    @IsNotEmpty()    
    readonly nbBath: number;

    
    @IsNotEmpty()
    @IsString()
    readonly titre: string;

    @IsNotEmpty()
    @IsString()
    readonly description: string;


    @IsNotEmpty()
    @IsArray()
    readonly ameneties: string[];

    @IsNotEmpty()
    @IsArray()
     images: string[];

    @IsNotEmpty()
    readonly price : number;

    @IsEmpty({message: "you can not pass user id"})
    readonly userId: User ; 

    
    
}