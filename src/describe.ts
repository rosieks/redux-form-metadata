import * as Interfaces from './interfaces';
import { createValidator, createAsyncValidator, combineAsyncValidators } from './validation';

function validateForm(fields, $form) {
    return values => {
        let errors = fields.reduce((errors, field) => (errors[field.name] = field.validate(values[field.name]), errors), {});
        if ($form.validate) {
            errors._error = $form.validate(values);
        }
        return errors;
    };
}

function warnForm(fields, $form) {
    return values => {
        let warnings = fields.reduce((warnings, field) => (warnings[field.name] = field.warn(values[field.name]), warnings), {});
        if ($form.warn) {
            warnings._warning = $form.warn(values);
        }
        return warnings;
    };
}

function describeForm(fields, $form) {
    return {
        validate: validateForm(fields, $form),
        warn: warnForm(fields, $form),
        asyncValidate: combineAsyncValidators(fields.filter(x => x.asyncValidate)),
        asyncBlurFields: fields.reduce((fields, field) => [...fields, ...field.asyncBlurFields], [])
    }
}

function describeFields<T>(description: Interfaces.IDescription<T>) {
    return Object
        .keys(description)
        .filter(key => key !== '$form')
        .map(name => {
            let { errors, warnings, ...props } = description[name];
            let field = { name, ...props};
            let { asyncValidate, asyncBlurFields } = createAsyncValidator(errors || {}, field);
            return {
                name,
                props,
                validate: createValidator(errors || {}, field),
                warn: createValidator(warnings || {}, field),
                asyncValidate,
                asyncBlurFields
            };
        });
}


export function describeType<T>(description: Interfaces.IDescription<T>): Interfaces.IDescriptor<T> {
    let fields = describeFields(description);
    return {
        form: describeForm(fields, description.$form || {}),
        fields: fields.reduce((acc, field) => {
            acc[field.name] = {
                name: field.name,
                validate: field.validate,
                warn: field.warn,
                ...(field.props || {})
            };
            return acc;
        },{})
    }
}