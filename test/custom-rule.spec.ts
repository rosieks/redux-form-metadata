import { addRule, describeType } from './../src';
import { Customer } from './types';
import { assert } from 'chai';
import 'mocha';

describe('Custom rules', () => {

    addRule('simpleRule', _ => value => value === 5, (field, param) => 'Simple rule message');
    addRule('paramRule', param => value => value === param, (field, param) => `Rule with param ${param}`);

    let descriptor = describeType<Customer>({
        name: {
            errors: {
                simpleRule: true
            }
        },
        email: {
            errors: {
                paramRule: 10
            }
        },
        phone: {
            errors: {
                required: {
                    param: true,
                    message: 'Custom error message'
                }
            }
        },
        age: {
            errors: {
                min: {
                    param: 15,
                    message: (field, param) => `Your ${field.name} must be at least ${param}`
                }
            }
        }
    });

    describe('paramless rule', () => {
        it('should return undefine if value is equal to 5', () => {
            assert.equal(descriptor.fields.name.validate(5), undefined);
        });

        it('should return error message if value is invalid', () => {
            assert.equal(descriptor.fields.name.validate(10), 'Simple rule message');   
        });
    });

    describe('rule with param', () => {

        it('should return undefined if value is equal to param ', () => {
            assert.equal(descriptor.fields.email.validate(10), undefined);
        });

        it('should return error message if value is invalid', () => {
            assert.equal(descriptor.fields.email.validate(5), 'Rule with param 10');
        });
    });

    describe('rule with custom message', () => {
        it('should return custom message if value is invalid', () => {
            assert.equal(descriptor.fields.phone.validate(null), 'Custom error message');
            assert.equal(descriptor.fields.age.validate(10), 'Your age must be at least 15');
        });
    });
});