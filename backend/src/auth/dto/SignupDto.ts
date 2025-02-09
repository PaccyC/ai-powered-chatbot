import { IsEmail, IsNotEmpty, IsString, Min } from "class-validator";


export class SignupDto {


    @IsString()
    @IsNotEmpty()
    @Min(4)
    name: string;
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    @Min(8)
    password: string;
}