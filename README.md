# redux-form-metadata
---------------

`redux-form-metadata` is library that enhance `redux-form` by providing declarative API to describe form fields.
One of the most important part of this description are validation and warning rules.

## Instalation
---------
`npm install --save redux-form-metadata`

## Getting Started

```
import { describeType } from 'redux-form-metadata';
import { reduxForm, Field } from 'redux-form';
import * as React from 'react';

let customerDescriptor = describeType({
    name: {
        label: 'Name',
        placeholder: 'Enter the name',
        errors: {
            required: true
        },
        warnings: {
            minLength: 2
        }
    }
});

@reduxForm({
    name: 'customer',

    // this line injects properties related to validation like: validate, warn, asyncValidate and asyncBlurFields
    ...customerDescriptor.form
})
export class CustomerForm extends React.Component {
    render() {
        return (
            <form>
                {/* this line injects properties describing field like name, label and other non special properties provided to descriptor (i.e. placeholder) */}
                <Field {...customerDescriptor.fields.name} /> 
            </form>
        );
    }
}

```