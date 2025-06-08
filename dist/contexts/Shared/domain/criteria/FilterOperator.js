"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterOperator = exports.Operator = void 0;
const EnumValueObject_1 = require("../value-object/EnumValueObject");
const InvalidArgumentError_1 = require("../value-object/InvalidArgumentError");
var Operator;
(function (Operator) {
    Operator["EQUAL"] = "=";
    Operator["NOT_EQUAL"] = "!=";
    Operator["GT"] = ">";
    Operator["LT"] = "<";
    Operator["CONTAINS"] = "CONTAINS";
    Operator["NOT_CONTAINS"] = "NOT_CONTAINS";
})(Operator || (exports.Operator = Operator = {}));
class FilterOperator extends EnumValueObject_1.EnumValueObject {
    constructor(value) {
        super(value, Object.values(Operator));
    }
    static fromValue(value) {
        for (const operatorValue of Object.values(Operator)) {
            if (value === operatorValue.toString()) {
                return new FilterOperator(operatorValue);
            }
        }
        throw new InvalidArgumentError_1.InvalidArgumentError(`The filter operator ${value} is invalid`);
    }
    isPositive() {
        return this.value !== Operator.NOT_EQUAL && this.value !== Operator.NOT_CONTAINS;
    }
    throwErrorForInvalidValue(value) {
        throw new InvalidArgumentError_1.InvalidArgumentError(`The filter operator ${value} is invalid`);
    }
    static equal() {
        return this.fromValue(Operator.EQUAL);
    }
}
exports.FilterOperator = FilterOperator;
