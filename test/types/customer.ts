import { Address, addressDescriptor } from './address';
import { sleep } from './../utils';
import { describeType } from './../../src';

export type Customer = {
    name: string,
    age: number,
    dateOfBirth: number,
    addresses: Address[],
    email: string,
    phone: string
};

export const customerDescription = {
    name: {
        label: 'Name',
        placeholder: 'Enter your name',
        errors: {
            required: true,
            maxLength: 30,
            promise: (value, _) => sleep(50).then(() => value === 'async' ? true : "Invalid name"), 
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
            promise: (value, _) => sleep(50).then(() => value === "async@test" ? true : "Invalid e-mail")
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