'use strict';
const Syntax = require('./syntax');
const Suggestions = require('./suggestions');
const Disposable = require('./disposable');


exports = module.exports = {};

exports.validate = function (address, options) {
    options = options || {};

    const isSyntaxValid = Syntax.checkSyntax(address, options.checkSyntaxOptions);

    // if syntax is invalid we won't continue with the other tests
    if (!isSyntaxValid) {
        return new Promise((resolve) => {
            resolve({
                isValid: false,
                isDisposableAddress: null,
                suggestion: null
            })
        })
    }

    return Suggestions.checkSuggestions(address, options.checkSuggestionsOptions).then((suggestionRes) => {
        const isDisposable = Disposable.checkDisposable(address);

        const suggestion = suggestionRes
            ? suggestionRes.full
            : null;

        return {
            isValid: true,
            isDisposableAddress: isDisposable,
            suggestion: suggestion
        }
    });
};