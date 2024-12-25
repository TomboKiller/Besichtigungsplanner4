import { Module } from '@nestjs/common';
import { VisitsModule } from './visits/visits.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validate } from './env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the configuration globally available across all modules
      validate,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URL'), // Get DB URL from .env
      }),
      inject: [ConfigService], // Inject ConfigService
    }),
    VisitsModule,
  ],
})
export class AppModule {}
