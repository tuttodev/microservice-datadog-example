"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoConfigFactory = void 0;
const config_1 = __importDefault(require("../../config"));
class MongoConfigFactory {
    static createConfig() {
        return {
            url: config_1.default.get('mongo.url')
        };
    }
}
exports.MongoConfigFactory = MongoConfigFactory;
