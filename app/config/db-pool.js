'use strict';

const mongoose = require('mongoose');

mongoose.Promise = Promise;

async function openConnection(options) {
    console.log('Connecting database to', options.mongoUri);
    const conn = await mongoose.connect(options.mongoUri, {
        useNewUrlParser: true,
    });
    return conn;
}

function createMongoConnector(options) {
    return {
        connect() {
            return openConnection(options);
        },
        disconnect() {
            const closeConnectionPromise = mongoose.connection.close();
            mongoose.connection.removeAllListeners();

            return closeConnectionPromise;
        },
    };
}

module.exports = createMongoConnector;
