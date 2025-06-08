"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoRepository = void 0;
const MongoCriteriaConverter_1 = require("./MongoCriteriaConverter");
class MongoRepository {
    _client;
    criteriaConverter;
    constructor(_client) {
        this._client = _client;
        this.criteriaConverter = new MongoCriteriaConverter_1.MongoCriteriaConverter();
    }
    client() {
        return this._client;
    }
    async collection() {
        return (await this._client).db().collection(this.collectionName());
    }
    async persist(id, aggregateRoot) {
        const collection = await this.collection();
        const document = { ...aggregateRoot.toPrimitives() };
        await collection.updateOne({ id }, { $set: document }, { upsert: true });
    }
    async searchByCriteria(criteria) {
        const query = this.criteriaConverter.convert(criteria);
        const collection = await this.collection();
        return await collection.find(query.filter, {}).sort(query.sort).skip(query.skip).limit(query.limit).toArray();
    }
}
exports.MongoRepository = MongoRepository;
