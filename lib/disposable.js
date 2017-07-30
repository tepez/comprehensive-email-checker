'use strict';
const _ = require('lodash');
const Mailchecker = require('mailchecker');


const sortedBlacklist = _.clone(Mailchecker.blacklist());
sortedBlacklist.sort();

// aaa.example.com => [ 'com', 'example.com', 'aaa.example.com' ]
const allDomainSuffixes = (email) => {
    const domainComponents = email.split('@')[1].split('.');

    return _.range(0, domainComponents.length).map((n) => {
        return domainComponents.slice(n).join('.');
    });
};

exports.checkDisposable = (address) => {
    return _.some(allDomainSuffixes(address), (domain) => _.sortedIndexOf(sortedBlacklist, domain) >= 0);
};