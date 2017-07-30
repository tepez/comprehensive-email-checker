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

    EmailChecker.validate('example1@gmail.com').then((result) => {
        /**
        {
            isValid: true,
            isDisposableAddress: false,
            suggestion: null
        }
        **/
    });


## API

### validate(address, options)

Return a promise that resolves with a results object containing.
If the syntax of the email was not valid, then none of the other tests will run and the results object will be:

```
{
    isValid: false,
    suggestion: null,
    isDisposableAddress: null
}
```json

If the syntax is valid, then the results object will be:

```
{
    isValid: true
    suggestion: An email address (string) if there is a suggestion or null if there is not
    isDisposableAddress: true/false this is a disposable address
}
```json

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
