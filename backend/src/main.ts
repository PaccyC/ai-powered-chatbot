import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  app.enableCors({
    credentials: true,
    origin: "http://localhost:3000",
    methods:["GET","PUT","POST","DELETE","PATCH","HEAD"]
  })
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
