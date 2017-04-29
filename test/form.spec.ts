import { customerDescriptor } from './types';
import { assert } from 'chai';

describe('Form description', () => {
    describe('validate', () => {

        it('should return errors for each invalid field', () => {
            let errors = customerDescriptor.form.validate({});
            assert.equal(errors.name, 'The Name field is required');
            assert.equal(errors.age, 'The Age field is required');
            assert.equal(errors.addresses, 'The Addresses field is required');
            assert.equal(errors.email, 'The E-mail field is required');
            assert.equal(errors.phone, undefined);
        });
    });

    describe('warn', () => {
        it('should return warning for some fields', () => {
            let warnings = customerDescriptor.form.warn({ name: 'A', age: 10 });
            assert.equal(warnings.name, 'Thie field Name must be a string with a minimum length of 2');
            assert.equal(warnings.age, 'The field Age must be greather than or equal to 18');
            assert.equal(warnings.addresses, undefined);
            assert.equal(warnings.email, undefined);
            assert.equal(warnings.phone, undefined);
        });
    });

    describe('async', () => {

        it('should throw object with error messages for invalid fields', done => {
            customerDescriptor.form.asyncValidate({}).catch(err => {
                assert.equal(err.name, "Invalid name");
                assert.equal(err.email, "Invalid e-mail");
                done();
            });
        });

        it('should resolve without error', done => {
            customerDescriptor.form.asyncValidate({ name: 'async', email: 'async@test' })
                .catch(err => {
                    assert.isNull(err);
                    done();
                })
                .then(done);
        });

        it('should throw object with error message for blurred field', done => {
        customerDescriptor.form.asyncValidate({}, null, null, 'name').catch(err => {
                assert.equal(err.name, "Invalid name");
                assert.equal(err.email, undefined);
                done();
            });    
        })

        it('should return array containing fields with async validator', () => {
            assert.equal(customerDescriptor.form.asyncBlurFields.length, 2);
            assert.equal(customerDescriptor.form.asyncBlurFields[0], 'name');
            assert.equal(customerDescriptor.form.asyncBlurFields[1], 'email');
        });
    });
});