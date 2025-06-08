import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CourseCreator } from '../../../contexts/LearningPlatform/Courses/application/Create/CourseCreator';
import { MongoCourseRepository } from '../../../contexts/LearningPlatform/Courses/infrastructure/persistence/MongoCourseRepository';
import { MongoClientFactory } from '../../../contexts/Shared/infrastructure/persistence/mongo/MongoClientFactory';
import { MongoClient } from 'mongodb';

// MongoDB connection configuration
const mongoConfig = {
  url: process.env.MONGO_URL || 'mongodb://localhost:27017/learning-platform'
};

// MongoDB client provider
const mongoClientProvider = {
  provide: 'MONGO_CLIENT',
  useFactory: async () => {
    return MongoClientFactory.createClient('learning-platform', mongoConfig);
  }
};

// Repository provider
const courseRepositoryProvider = {
  provide: 'CourseRepository',
  useFactory: (client: Promise<MongoClient>) => {
    return new MongoCourseRepository(client);
  },
  inject: ['MONGO_CLIENT']
};

// Use case provider
const courseCreatorProvider = {
  provide: CourseCreator,
  useFactory: (repository: MongoCourseRepository) => {
    return new CourseCreator(repository);
  },
  inject: ['CourseRepository']
};

@Module({
  controllers: [CoursesController],
  providers: [
    mongoClientProvider,
    courseRepositoryProvider,
    courseCreatorProvider
  ]
})
export class CoursesModule {}
