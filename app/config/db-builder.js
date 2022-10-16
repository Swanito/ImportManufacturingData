'use strict';

const mongoConfig = require('./db-config');
const createMongoPool = require('./db-pool');

module.exports = createMongoPool(mongoConfig);
