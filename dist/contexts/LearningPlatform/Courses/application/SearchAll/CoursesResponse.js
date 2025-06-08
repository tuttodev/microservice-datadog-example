"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoursesResponse = void 0;
class CoursesResponse {
    courses;
    constructor(courses) {
        this.courses = courses.map(course => course.toPrimitives());
    }
}
exports.CoursesResponse = CoursesResponse;
