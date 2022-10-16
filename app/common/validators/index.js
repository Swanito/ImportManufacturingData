const criteriaValidator = require('./criteria-validator');
const requiredHeadersValidator = require('./required-headers-validator');
const missingColumnsValidator = require('./missing-columns-validator');

module.exports = {
    criteriaValidator,
    requiredHeadersValidator,
    missingColumnsValidator
}