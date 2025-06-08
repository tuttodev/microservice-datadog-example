"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseName = void 0;
const StringValueObject_1 = require("../../../Shared/domain/value-object/StringValueObject");
const CourseNameLengthExceeded_1 = require("./CourseNameLengthExceeded");
class CourseName extends StringValueObject_1.StringValueObject {
    constructor(value) {
        super(value);
        this.ensureLengthIsLessThan30Characters(value);
    }
    ensureLengthIsLessThan30Characters(value) {
        if (value.length > 30) {
            throw new CourseNameLengthExceeded_1.CourseNameLengthExceeded(`The Course Name <${value}> has more than 30 characters`);
        }
    }
}
exports.CourseName = CourseName;
