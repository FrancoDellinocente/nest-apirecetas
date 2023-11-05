import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';

@Injectable()
export class AppService {
  getHello(): string {
    dotenv.config();
    const databaseUrl = process.env.DB_URI;
    console.log(`La URL de la base de datos es: ${databaseUrl}`);
    return 'Hello World!';
  }
}
