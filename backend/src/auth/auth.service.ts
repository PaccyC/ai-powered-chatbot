import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, SignupDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as  bcrypt from "bcrypt"
import { AuthResponse } from './types';

@Injectable()
export class AuthService {

    constructor(
        private  jwtService: JwtService,
        private prismaService: PrismaService
    ){}

    async login(loginDto:LoginDto) : Promise <AuthResponse>{
        try {
            
            const user= await this.prismaService.appUser.findUnique({
                where:{
                    email:loginDto.email
                }
            })

            if(!user){
                throw new ForbiddenException("User not found!")
            }
            const match= await bcrypt.compare(loginDto.password,user.passwordHash);
            if(!match){
                throw new ForbiddenException("Invalid credentials!")
            }

            const token=  await this.signToken(user.id,user.name, user.email);
            return {
                access_token:  token.access_token,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name
                }
            }


        } catch (error) {
            throw error;
        }
    }

    async register(signupDto:SignupDto): Promise<AuthResponse>{

        try {
            
            const existingUser= await this.prismaService.appUser.findUnique({
                where:{
                    email: signupDto.email
                }
            })
            if(existingUser){
                throw new ForbiddenException("User already exists!")
            }
            // Go ahead and create new User
           
            const hashedPassword= await bcrypt.hash(signupDto.password,10);
            const newUser= await this.prismaService.appUser.create({
                data:{
                    name: signupDto.name,
                    email: signupDto.email,
                    passwordHash: hashedPassword
                }
            })
            const token= await this.signToken(newUser.id,newUser.name, newUser.email);
            return {
                access_token: token.access_token,
                user: {
                    id: newUser.id,
                    name: newUser.name,
                    email: newUser.email,
                }
            } 
        } catch (error) {
            throw error;
        }
    }
    
    async signToken(userId: number, name:string, email:string): Promise<{'access_token': string}> {
        const payload= {
            sub: userId,
            name,
            email, 
        }
        const access_token= await this.jwtService.signAsync(
            payload,{
                secret: process.env.JWT_SECRET,
                expiresIn: '2d'
            }
        )
        return {
            "access_token": access_token
        }
    }

    async validateUser(email:string,password:string): Promise<any> {
        try{
            const user= await this.prismaService.appUser.findUnique({
                where:{
                    email
                }
            })
            if(!user){
                throw new BadRequestException("User not found")
            }
            const match= await bcrypt.compare(password,user.passwordHash);
            if(!match){
                throw new ForbiddenException("Invalid credentials!")
            }
            return user
        }
        catch(error){
            throw error;
        }
    }
}
