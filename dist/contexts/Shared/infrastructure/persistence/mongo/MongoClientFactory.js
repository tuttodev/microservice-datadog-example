"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoClientFactory = void 0;
const mongodb_1 = require("mongodb");
class MongoClientFactory {
    static clients = {};
    static async createClient(contextName, config) {
        let client = MongoClientFactory.getClient(contextName);
        if (!client) {
            client = await MongoClientFactory.createAndConnectClient(config);
            MongoClientFactory.registerClient(client, contextName);
        }
        return client;
    }
    static getClient(contextName) {
        return MongoClientFactory.clients[contextName];
    }
    static async createAndConnectClient(config) {
        const client = new mongodb_1.MongoClient(config.url, { ignoreUndefined: true });
        await client.connect();
        return client;
    }
    static registerClient(client, contextName) {
        MongoClientFactory.clients[contextName] = client;
    }
}
exports.MongoClientFactory = MongoClientFactory;
