# comprehensive-email-checker
A comprehensive checker for email addresses:

Currently checks:

1. Syntax - validate the address according to RFCs 5321, 5322, and others using [hapijs/isemail](https://github.com/hapijs/isemail).
1. Disposable addresses - test if the address is a disposable (temporary/throwaway) address, e.g. aaa@yopmail.com, using [FGRibreau/mailchecker](https://github.com/FGRibreau/mailchecker).
1. Suggestions - check for possible misspelling using [mailcheck/mailcheck](https://github.com/mailcheck/mailcheck).

WIP:

1. Specific grammars of some email providers - some ESPs have their own set of rules, e.g. tom@gmail.com cannot be a valid email address. Test using [tepez/email-grammar-test](https://github.com/tepez/email-grammar-test).
1. DNS -

## Usage

    const EmailChecker = require('comprehensive-email-checker');

    EmailChecker.validate('email@example.com').then((result) => {

    })


## API

### validate(address, options)

#### address

Type: `string`

#### options

Type: object

##### checkSyntaxOptions

Type: object

Options to pass to [isemail](https://github.com/hapijs/isemail#validateemail-options-callback)

Default: null

#### checkSuggestionsOptions

Type: object

Default: null

Options to pass to [mailcheck](https://github.com/mailcheck/mailcheck#usage-without-jquery)

Do not pass the `suggested` or `empty` callback options as they are used internally.
