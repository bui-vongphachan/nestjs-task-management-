import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TasksController } from './tasks/tasks.controller';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './auth/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      database: 'c',
      synchronize: true,
      useUnifiedTopology: true,
      entities: [User],
    }),
    TasksModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
