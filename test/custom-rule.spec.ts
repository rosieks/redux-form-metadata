import { addRule, describeType } from './../src';
import { Customer } from './types';
import { assert } from 'chai';
import 'mocha';

describe('Custom rules', () => {

    addRule('simpleRule', _ => value => value === 5, null);
    addRule('paramRule', param => value => value === param, null);

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
        }
    });

    it('should return true if value is equal to 5', () => {
        assert.equal(descriptor.fields.name.validate(5), true);
        assert.equal(descriptor.fields.name.validate(10), false);
    });

    it('should return true if value is equal to param ', () => {
        assert.equal(descriptor.fields.email.validate(5), false);
        assert.equal(descriptor.fields.email.validate(10), true);
    });
});