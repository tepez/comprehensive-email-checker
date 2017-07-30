'use strict';
const Isemail = require('isemail');
const _ = require('lodash');


exports.checkSyntax = (address, options) => {
    const isemailOptions = _.assign({
        errorLevel: true
    }, options);

    const result = Isemail.validate(address, isemailOptions);

    if (result === 0) {
        return true;
    } else {
        return Isemail.diagnoses[result];
    }
};