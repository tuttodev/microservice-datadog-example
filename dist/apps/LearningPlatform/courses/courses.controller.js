"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoursesController = void 0;
const common_1 = require("@nestjs/common");
const CourseCreator_1 = require("../../../contexts/LearningPlatform/Courses/application/Create/CourseCreator");
const CourseId_1 = require("../../../contexts/LearningPlatform/Shared/domain/Courses/CourseId");
const CourseName_1 = require("../../../contexts/LearningPlatform/Courses/domain/CourseName");
const CourseDuration_1 = require("../../../contexts/LearningPlatform/Courses/domain/CourseDuration");
const hot_shots_1 = require("hot-shots");
let CoursesController = class CoursesController {
    courseCreator;
    statsd;
    constructor(courseCreator) {
        this.courseCreator = courseCreator;
        console.log("CoursesController initialized");
        this.statsd = new hot_shots_1.StatsD({
            host: process.env.DATADOG_HOST || 'localhost',
            port: parseInt(process.env.DATADOG_PORT || '8125'),
            protocol: 'udp',
            prefix: 'microservice_datadog_example.',
            errorHandler: (error) => {
                console.error('StatsD error:', error);
            },
            globalTags: {
                service: 'learning-platform',
                environment: process.env.NODE_ENV || 'local'
            }
        });
    }
    async createCourse(body) {
        const courseId = new CourseId_1.CourseId(body.id);
        const courseName = new CourseName_1.CourseName(body.name);
        const courseDuration = new CourseDuration_1.CourseDuration(body.duration);
        console.log(courseId);
        await this.courseCreator.run({
            id: courseId,
            name: courseName,
            duration: courseDuration
        });
        console.log("Course created:", body);
        this.statsd.increment('courses_created');
    }
};
exports.CoursesController = CoursesController;
__decorate([
    (0, common_1.Post)('/'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "createCourse", null);
exports.CoursesController = CoursesController = __decorate([
    (0, common_1.Controller)('courses'),
    __metadata("design:paramtypes", [CourseCreator_1.CourseCreator])
], CoursesController);
