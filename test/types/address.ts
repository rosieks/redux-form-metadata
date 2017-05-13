import { describeType } from './../../src';

export type Address = {
    street: string,
    city: string
};

export const addressDescription = {
    street: {
        label: 'Street',
        errors: {
            required: true,
        }
    },
    city: {
        label: 'City',
        errors: {
            required: true,
        }
    }
};
export const addressDescriptor = describeType<Address>(addressDescription);