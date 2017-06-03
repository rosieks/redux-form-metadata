import { customerDescriptor } from './types';
import { assert } from 'chai';

export const validate = () => {
    describe('validate', () => {

        it('should return errors for each invalid field', () => {
            let errors = customerDescriptor.form.validate({});
            assert.equal(errors.name, 'The Name field is required.');
            assert.equal(errors.age, 'The Age field is required.');
            assert.equal(errors.addresses._error, 'The Addresses field is required.');
            assert.equal(errors.email, 'The E-mail field is required.');
            assert.equal(errors.phone, undefined);
            assert.equal(errors._error, 'Form level validation');
        });

        it('should return errors for invalid nested field', () => {
            let errors = customerDescriptor.form.validate({
                addresses: [
                    {}
                ]
            });

            assert.equal(errors.addresses._error, undefined);
            assert.equal(errors.addresses[0].street, 'The Street field is required.');
            assert.equal(errors.addresses[0].city, 'The City field is required.');
        });
    });

    describe('warn', () => {
        it('should return warning for some fields', () => {
            let warnings = customerDescriptor.form.warn({ name: 'A', age: 10 });
            assert.equal(warnings.name, 'Thie field Name must be a string with a minimum length of 2.');
            assert.equal(warnings.age, 'The field Age must be greather than or equal to 18.');
            assert.equal(warnings.addresses, undefined);
            assert.equal(warnings.email, undefined);
            assert.equal(warnings.phone, undefined);
            assert.equal(warnings._warning, 'Form level warning');
        });
    });
};