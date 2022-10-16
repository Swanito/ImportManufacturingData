'use strict';

const { MONGO_URI: mongoUri } = process.env || "mongodb://localhost:27017";

const config = {
    mongoUri,
};

module.exports = config;
