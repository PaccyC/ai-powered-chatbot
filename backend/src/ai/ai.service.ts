import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';


@Injectable()
export class AiService {

    private openAi: OpenAI;
    constructor(){
        this.openAi= new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        })   
    }


    async generateResponse(prompt: string): Promise<string>{
        try {
            
            const response= await  this.openAi.chat.completions.create({
                model: "gpt-4",
                messages:[{role:"user",content:prompt}]
            })
            return response.choices[0].message.content || "No Response"
        } 
        catch (error) {
            console.error('Error calling OpenAI API:', error);
            return 'Error generating response';
        }
    }

}
