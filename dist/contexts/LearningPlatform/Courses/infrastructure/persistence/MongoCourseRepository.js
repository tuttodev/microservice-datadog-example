"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoCourseRepository = void 0;
const MongoRepository_1 = require("../../../../Shared/infrastructure/persistence/mongo/MongoRepository");
const Course_1 = require("../../domain/Course");
class MongoCourseRepository extends MongoRepository_1.MongoRepository {
    save(course) {
        return this.persist(course.id.value, course);
    }
    async search(id) {
        const collection = await this.collection();
        const document = await collection.findOne({ id });
        return document ? Course_1.Course.fromPrimitives({ name: document.name, duration: document.duration, id: id.value }) : null;
    }
    collectionName() {
        return 'courses';
    }
    async searchAll() {
        const collection = await this.collection();
        const documents = await collection.find({}, {}).toArray();
        return documents.map(document => {
            return Course_1.Course.fromPrimitives({ name: document.name, duration: document.duration, id: document.id });
        });
    }
}
exports.MongoCourseRepository = MongoCourseRepository;
