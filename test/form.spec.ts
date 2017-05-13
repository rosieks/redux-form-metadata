import { validate } from './form.validate.spec';
import { asyncValidate } from './form.asyncValidate.spec';

describe('Form description', () => {
    validate();
    asyncValidate();
});