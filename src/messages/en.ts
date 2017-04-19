import { message } from './utils';

export default {
    required: message((field, param) => `The ${field} field is required`),
    min: message((field, param) => `The field ${field} must be greather than or equal to ${param}`),
    max: message((field, param) => `The field ${field} must be less than or equal to ${param}`),
    minLength: message((field, param) => `Thie field ${field} must be a string with a minimum length of ${param}`),
    maxLength: message((field, param) => `Thie field ${field} must be a string with a maximum length of ${param}`),
    pattern: null,
    number: null,
    email: message((field, param) => `The ${field} field is not valid e-mail address`),
    url: message((field, param) => `The ${field} field is not valid fully-qualified http, https, or ftp URL`),
    date: message((field, param) => ``),
    dateISO: message((field, param) => ``),
    digits: message((field, param) => ``),
};