import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class UserService {

    constructor(
        private prismaService: PrismaService
    ){
     
    }


    async getAllUsers(){
        try {
         const users= await this.prismaService.appUser.findMany();
         return users;
        } 
        catch (error:any) {
            console.log("Error while getting users", error.message);
            
        }

    }
}
