'use strict';
const ComprehensiveEmailChecker = require('..');
const Bluebird = require('bluebird');


describe('.validate()', () => {
    const testAddresses = (specOpts) => {
        return Bluebird.each(specOpts, (specOpt) => {
            return ComprehensiveEmailChecker.validate(specOpt.address).then((result) => {
                expect(result).toEqual(specOpt.expectedResult);
                if (!jasmine.matchersUtil.equals(result, specOpt.expectedResult)) {
                    console.error(`
                        Spec failed for address ${specOpt.address}.
                        Expected:
                            ${JSON.stringify(specOpt.expectedResult)}
                        Got:
                            ${JSON.stringify(result)}

                        `);
                }
            })
        });
    };

    describe('when email is invalid', () => {
        it('should not run the other tests', (done) => {
            testAddresses([
                {
                    address: '',
                    expectedResult:  {
                        isValid: false,
                        isDisposableAddress: null,
                        suggestion: null
                    }
                },
                {
                    address: 'aaa',
                    expectedResult:  {
                        isValid: false,
                        isDisposableAddress: null,
                        suggestion: null }
                },
                {
                    address: 'aaa@',
                    expectedResult:  {
                        isValid: false,
                        isDisposableAddress: null,
                        suggestion: null
                    }
                },
                {
                    address: '@aaa',
                    expectedResult:  {
                        isValid: false,
                        isDisposableAddress: null,
                        suggestion: null
                    }
                }
            ]).then(done, done.fail);
        });
    });

    describe('disposables address', () => {
        it('should resolve with isDisposableAddress:true when address is disposable', (done) => {
            testAddresses([
                {
                    address: 'aaa@yopmail.com',
                    expectedResult:  {
                        isValid: true,
                        isDisposableAddress: true,
                        suggestion: 'aaa@ymail.com'
                    }
                },
                {
                    address: 'bbb@guerrillamail.com',
                    expectedResult:  {
                        isValid: true,
                        isDisposableAddress: true,
                        suggestion: null
                    }
                },
                {
                    address: 'ccc@mailinator.com',
                    expectedResult:  {
                        isValid: true,
                        isDisposableAddress: true,
                        suggestion: null
                    }
                }
            ]).then(done, done.fail);
        });

        it('should resolve with isDisposableAddress:false when address is NOT disposable', (done) => {
            testAddresses([
                {
                    address: 'aaabbb@ymail.com',
                    expectedResult:  {
                        isValid: true,
                        isDisposableAddress: false,
                        suggestion: null
                    }
                },
                {
                    address: 'bbbccc@gmail.com',
                    expectedResult:  {
                        isValid: true,
                        isDisposableAddress: false,
                        suggestion: null
                    }
                },
                {
                    address: 'dddeee@hotmail.com',
                    expectedResult:  {
                        isValid: true,
                        isDisposableAddress: false,
                        suggestion: null
                    }
                }
            ]).then(done, done.fail);
        });
    });

    describe('suggestions', () => {
        it('should resolve with suggestion:ADDRESS when there is a suggestion', (done) => {
            testAddresses([
                {
                    address: 'aaabbb@ymal.com',
                    expectedResult:  {
                        isValid: true,
                        isDisposableAddress: false,
                        suggestion: 'aaabbb@ymail.com'
                    }
                },
                {
                    address: 'bbbccc@gamil.com',
                    expectedResult:  {
                        isValid: true,
                        isDisposableAddress: false,
                        suggestion: 'bbbccc@gmail.com'
                    }
                },
                {
                    address: 'dddeee@hotmal.com',
                    expectedResult:  {
                        isValid: true,
                        isDisposableAddress: false,
                        suggestion: 'dddeee@hotmail.com'
                    }
                }
            ]).then(done, done.fail);
        });

        it('should resolve with isDisposableAddress:null when there is not suggestion', (done) => {
            testAddresses([
                {
                    address: 'aaabbb@ymail.com',
                    expectedResult:  {
                        isValid: true,
                        isDisposableAddress: false,
                        suggestion: null
                    }
                },
                {
                    address: 'bbbccc@gmail.com',
                    expectedResult:  {
                        isValid: true,
                        isDisposableAddress: false,
                        suggestion: null
                    }
                },
                {
                    address: 'dddeee@hotmail.com',
                    expectedResult:  {
                        isValid: true,
                        isDisposableAddress: false,
                        suggestion: null
                    }
                }
            ]).then(done, done.fail);
        });
    });
});