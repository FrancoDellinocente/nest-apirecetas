import { Injectable } from '@nestjs/common';
@Injectable()
export class AppService {
  getHello(): string {
    const databaseUrl = process.env.DB_URI;
    console.log(`La URL de la base de datos es: ${databaseUrl}`);
    return 'Hello World!';
  }
}
