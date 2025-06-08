import { Module } from '@nestjs/common';
import { PingController } from './ping/ping.controller';
import { CoursesModule } from './courses/courses.module';

@Module({
  controllers: [PingController],
  imports: [CoursesModule]
})
export class AppModule {}
