"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = void 0;
const AggregateRoot_1 = require("../../../Shared/domain/AggregateRoot");
const CourseId_1 = require("../../Shared/domain/Courses/CourseId");
const CourseDuration_1 = require("./CourseDuration");
const CourseName_1 = require("./CourseName");
class Course extends AggregateRoot_1.AggregateRoot {
    id;
    name;
    duration;
    constructor(id, name, duration) {
        super();
        this.id = id;
        this.name = name;
        this.duration = duration;
    }
    static create(id, name, duration) {
        return new Course(id, name, duration);
    }
    static fromPrimitives(plainData) {
        return new Course(new CourseId_1.CourseId(plainData.id), new CourseName_1.CourseName(plainData.name), new CourseDuration_1.CourseDuration(plainData.duration));
    }
    toPrimitives() {
        return {
            id: this.id.value,
            name: this.name.value,
            duration: this.duration.value
        };
    }
}
exports.Course = Course;
