"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoursesFinder = void 0;
const CoursesResponse_1 = require("./CoursesResponse");
class CoursesFinder {
    coursesRepository;
    constructor(coursesRepository) {
        this.coursesRepository = coursesRepository;
    }
    async run() {
        const courses = await this.coursesRepository.searchAll();
        return new CoursesResponse_1.CoursesResponse(courses);
    }
}
exports.CoursesFinder = CoursesFinder;
