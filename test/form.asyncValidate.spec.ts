import { customerDescriptor } from './types';
import { assert } from 'chai';

export const asyncValidate = () => {
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
        });

        it('should return array containing fields with async validator', () => {
            assert.equal(customerDescriptor.form.asyncBlurFields.length, 2);
            assert.equal(customerDescriptor.form.asyncBlurFields[0], 'name');
            assert.equal(customerDescriptor.form.asyncBlurFields[1], 'email');
        });
    });
};