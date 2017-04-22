import { describeType } from './../src'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export type Address = {
    street: string,
    city: string
};

export type Customer = {
    name: string,
    age: number,
    dateOfBirth: number,
    addresses: Address[],
    email: string,
    phone: string
};

export const addressDescription = {
    street: {
        label: 'Street',
    },
    city: {
        label: 'City'
    }
};
export const addressDescriptor = describeType<Address>(addressDescription);

export const customerDescription = {
    name: {
        label: 'Name',
        placeholder: 'Enter your name',
        errors: {
            required: true,
            maxLength: 30,
            promise: (value, _) => sleep(50).then(() => true), 
        },
        warnings: {
            minLength: 2
        }
    },
    age: {
        label: 'Age',
        errors: {
            required: true,
            number: true
        },
        warnings: {
            min: 18
        }
    },
    addresses: {
        label: 'Addresses',
        descriptor: addressDescriptor,
        errors: {
            required: true
        }
    },
    email: {
        label: 'E-mail',
        errors: {
            required: true,
            email: true,
            promise: (value, _) => sleep(50).then(() => true)
        }
    },
    phone: {
        label: 'Phone',
        errors: {
            pattern: /\d{9}/i
        }
    }
};

export const customerDescriptor = describeType<Customer>(customerDescription);