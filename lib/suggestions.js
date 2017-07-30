'use strict';
const Mailcheck = require('mailcheck');
const _ = require('lodash');


exports.checkSuggestions = (address, options) => {
    return new Promise((resolve, rejct) => {
        const mailcheckOpts = _.assign({
            email: address,
            suggested: resolve,
            empty: resolve
        }, options);

        Mailcheck.run(mailcheckOpts);
    });
};