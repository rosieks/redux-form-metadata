import { describeType } from './../src';
import { Address, Customer } from './types';
import * as React from 'react';
import { reduxForm, Field } from 'redux-form';

const addressDescriptor = describeType<Address>({
    street: {
        label: 'Street',
    },
    city: {
        label: 'City'
    }
});

const customerDescriptor = describeType<Customer>({
    name: {
        label: 'Street',
        placeholder: 'Enter your name',
        errors: {
            required: true,
            maxLength: 30
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
            email: true
        }
    },
    phone: {
        label: 'Phone',
        errors: {
            pattern: /\d{9}/i
        }
    }
});

/*
@reduxForm({
    ...customerDescriptor.form
})
class SampleForm extends React.Component<any, any> {
    render() {
        return (
            <div>
                <Field {...customerDescriptor.fields.name} />
                <Field {...customerDescriptor.fields.age} />
                <Field {...customerDescriptor.fields.dateOfBirth} />
            </div>
        );
    }
}
*/