import { rules } from './../src/rules';
import { assert } from 'chai';

describe('Built-in rules', () => {
    describe('required', () => {
        testCase(rules.required(), 'test', true, 'should return true if value is provider');
        testCase(rules.required(), null, false, 'should return false if value is null');
        testCase(rules.required(), undefined, false, 'should return false if value is undefined');
        testCase(rules.required(), '', false, 'should return false if value is empty string');
        testCase(rules.required(), [], false, 'should return false if value is empty array');
    });

    describe('min', () => {
        testCase(rules.min(5), null, true, 'should return true if value is null');

        testCase(rules.min(5), 4, false, 'should return false if value is less than param');
        testCase(rules.min(5), 5, true, 'should return true if value is equal to param');
        testCase(rules.min(5), 6, true, 'should return true if value is greather than param');

        testCase(rules.min(new Date(1990, 0, 1)), new Date(1980, 0, 1), false, 'should return false if value is less than param');
        testCase(rules.min(new Date(1990, 0, 1)), new Date(1990, 0, 1), true, 'should return true if value is equal to param');
        testCase(rules.min(new Date(1990, 0, 1)), new Date(2000, 0, 1), true, 'should return true if value is greather than param');
    });

    describe('max', () => {
        testCase(rules.max(5), null, true, 'should return true if value is null');

        testCase(rules.max(5), 6, false, 'should return false if value is greather than param');
        testCase(rules.max(5), 5, true, 'should return true if value is equal to param');
        testCase(rules.max(5), 4, true, 'should return true if value is less than param');
        
        testCase(rules.max(new Date(1990, 0, 1)), new Date(2000, 0, 1), false, 'should return false if value is greather than param');
        testCase(rules.max(new Date(1990, 0, 1)), new Date(1990, 0, 1), true, 'should return true if value is equal to param');
        testCase(rules.max(new Date(1990, 0, 1)), new Date(1980, 0, 1), true, 'should return true if value is less than param');
    });

    describe('minLength', () => {
        testCase(rules.minLength(5), null, true, 'should return true if value is null');

        testCase(rules.minLength(5), 'testing', true, 'should return true if value text is longer than param');
        testCase(rules.minLength(5), 'test1', true, 'should return true if value text length is equal to param');
        testCase(rules.minLength(5), 'test', false, 'should return false if value text shorter than param');

        testCase(rules.minLength(5), [1,2,3,4,5,6], true, 'should return true if value array is longer than param');
        testCase(rules.minLength(5), [1,2,3,4,5], true, 'should return true if value array length is equal to param');
        testCase(rules.minLength(5), [1,2,3,4], false, 'should return false if value array shorter than param');
    });

    describe('maxLength', () => {
        testCase(rules.maxLength(5), null, true, 'should return true if value is null');

        testCase(rules.maxLength(5), 'testing', false, 'should return false if value text is longer than param');
        testCase(rules.maxLength(5), 'test1', true, 'should return true if value text length is equal to param');
        testCase(rules.maxLength(5), 'test', true, 'should return true if value text shorter than param');

        testCase(rules.maxLength(5), [1,2,3,4,5,6], false, 'should return false if value array is longer than param');
        testCase(rules.maxLength(5), [1,2,3,4,5], true, 'should return true if value array length is equal to param');
        testCase(rules.maxLength(5), [1,2,3,4], true, 'should return true if value array shorter than param');
    });

    describe('pattern', () => {
        testCase(rules.pattern(/\d/), null, true, 'should return true return if value is null');

        testCase(rules.pattern(/\d/), '5', true, 'Should return true if value match provided regular expression');
        testCase(rules.pattern(/\d/), 'test', false, 'Should return true if value match provided regular expression');
    });

    describe('email', () => {
        testCase(rules.email(), null, true, 'should return true if value is null');

        testCase(rules.email(), 'test@email.com', true, 'should return true if value is correct e-mail');
        testCase(rules.email(), 'test', false, 'should return false if value isn\'t correct e-mail');
    });

    describe('url', () => {
        testCase(rules.url(), null, true, 'should return true if value is null');

        testCase(rules.url(), 'http://www.github.com', true, 'should return true is value if correct url');
        testCase(rules.url(), 'test', false, 'should return true if value is isn\'t correct url');
    });

    describe('date', () => {
        testCase(rules.date(), null, true, 'should return true if value is null'); 
    });

    describe('dateISO', () => {
        testCase(rules.dateISO(), null, true, 'should return true if value is null'); 
    });

    describe('number', () => {
        testCase(rules.number(), null, true, 'should return true if value is null'); 
    });

    describe('digits', () => {
        testCase(rules.digits(), null, true, 'should return true if value is null');        

        testCase(rules.digits(), '123', true, 'should return true if value contains only digits');
        testCase(rules.digits(), 'test123', false, 'should return false if value contains letters and digits');
        testCase(rules.digits(), 'test', false, 'should return false if value contains letters');
    });

    describe('equalTo', () => {
        testCase(rules.equalTo('prop2'), null, true, 'should return true if value is null');

        testCase(rules.equalTo('prop2'), 'test', true, 'should return true is value is same as prop2 value', { prop2: 'test' });
        testCase(rules.equalTo('prop2'), 'abc', false, 'should return false is value isn\'t same as prop2 value', { prop2: 'test' });
    });
});

function testCase(rule, value, expected, description, object?) {
    it(description, () => {
        assert.equal(rule(value, { object }), expected);
    });
}