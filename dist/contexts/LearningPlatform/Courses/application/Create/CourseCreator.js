"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseCreator = void 0;
const Course_1 = require("../../domain/Course");
class CourseCreator {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async run(params) {
        const course = Course_1.Course.create(params.id, params.name, params.duration);
        await this.repository.save(course);
    }
}
exports.CourseCreator = CourseCreator;
