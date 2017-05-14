import * as Interfaces from './interfaces';
import { createValidator, createAsyncValidator, combineAsyncValidators } from './validation';

function describeForm(fields) {
    return {
        validate: value => fields.reduce((errors, field) => (errors[field.name] = field.validate(value[field.name]), errors), {}),
        warn: value => fields.reduce((warnings, field) => (warnings[field.name] = field.warn(value[field.name]), warnings), {}),
        asyncValidate: combineAsyncValidators(fields.filter(x => x.asyncValidate)),
        asyncBlurFields: fields.reduce((fields, field) => [...fields, ...field.asyncBlurFields], [])
    }
}

function describeFields<T>(description: Interfaces.IDescription<T>) {
    return Object
        .keys(description)
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
        form: describeForm(fields),
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