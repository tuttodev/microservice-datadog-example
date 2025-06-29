"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoursesModule = void 0;
const common_1 = require("@nestjs/common");
const courses_controller_1 = require("./courses.controller");
const CourseCreator_1 = require("../../../contexts/LearningPlatform/Courses/application/Create/CourseCreator");
const MongoCourseRepository_1 = require("../../../contexts/LearningPlatform/Courses/infrastructure/persistence/MongoCourseRepository");
const MongoClientFactory_1 = require("../../../contexts/Shared/infrastructure/persistence/mongo/MongoClientFactory");
const mongoConfig = {
    url: process.env.MONGO_URL || 'mongodb://localhost:27017/learning-platform'
};
const mongoClientProvider = {
    provide: 'MONGO_CLIENT',
    useFactory: async () => {
        return MongoClientFactory_1.MongoClientFactory.createClient('learning-platform', mongoConfig);
    }
};
const courseRepositoryProvider = {
    provide: 'CourseRepository',
    useFactory: (client) => {
        return new MongoCourseRepository_1.MongoCourseRepository(client);
    },
    inject: ['MONGO_CLIENT']
};
const courseCreatorProvider = {
    provide: CourseCreator_1.CourseCreator,
    useFactory: (repository) => {
        return new CourseCreator_1.CourseCreator(repository);
    },
    inject: ['CourseRepository']
};
let CoursesModule = class CoursesModule {
};
exports.CoursesModule = CoursesModule;
exports.CoursesModule = CoursesModule = __decorate([
    (0, common_1.Module)({
        controllers: [courses_controller_1.CoursesController],
        providers: [
            mongoClientProvider,
            courseRepositoryProvider,
            courseCreatorProvider
        ]
    })
], CoursesModule);
