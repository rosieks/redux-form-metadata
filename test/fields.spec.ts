import { customerDescriptor, customerDescription } from './types';
import { assert } from 'chai';

describe('Fields description', () => {

    it('should expose field name', () => {
        assert.equal(customerDescriptor.fields.name.name, 'name');
    });

    it('should expose additional field properties', () => {
        assert.equal(customerDescriptor.fields.name.label, customerDescription.name.label);
        assert.equal(customerDescriptor.fields.name.placeholder, customerDescription.name.placeholder);        
    });

    it('should not expose special description', () => {
        assert.equal(customerDescriptor.fields.name['errors'], undefined);
        assert.equal(customerDescriptor.fields.name['warnings'], undefined);
    });

    it('should return error message if field is invalid', () => {
        assert.equal(customerDescriptor.fields.name.validate(null), 'The Name field is required');
    });

    it('should return undefined if field is valid', () => {
        assert.isUndefined(customerDescriptor.fields.name.validate('John'));
    });

    it('should return warning message if field is invalid', () => {
        assert.equal(customerDescriptor.fields.name.warn('A'), 'Thie field Name must be a string with a minimum length of 2');
    });

    it('should return undefined if field is valid', () => {
        assert.isUndefined(customerDescriptor.fields.name.warn('John'));
    });
});