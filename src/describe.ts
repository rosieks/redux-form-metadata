import * as Interfaces from './interfaces';
import { rules, asyncRules } from './rules';

function describeForm(fields) {
    return {
        validate: value => fields.reduce((errors, field) => (errors[field.name] = field.validate[value[field.name]], errors), {}),
        warn: value => fields.reduce((warnings, field) => (warnings[field.name] = field.warn[value[field.name]], warnings), {}),
        asyncValidate: combineAsyncValidators(fields.filter(x => x.asyncValidator)),
        asyncBlurFields: fields.filter(x => x.asyncValidate).map(x => x.name)
    }
}

function combineAsyncValidators(fields) {
    return (values, dispatch) => Promise
        .all(fields.map(f => f.asyncValidator(values[f.name], dispatch)))
        .then(errors => fields
            .map((field, index) => ({ name: field.name, error: errors[index] }))
            .filter(field => field.error)
            .reduce((errors, field) => (errors[field.name] = field.error, errors), {})
        );
}

function createValidator(errors) {
    let currentRules = Object.keys(errors)
        .filter(rule => rules[rule])
        .map(rule => rules[rule](errors[rule]));

    return value => currentRules.map(rule => rule(value))[0]; // todo: return first that failed
}

function createAsyncValidator(errors) {
    let currentRules = Object.keys(errors)
        .filter(rule => asyncRules[rule])
        .map(rule => asyncRules[rule](errors[rule]));

    let asyncValidator = (value, dispatch) => Promise
        .all(currentRules.map(rule => rule(value, dispatch)))
        .then(results => {
            return results[0]; // todo: return first that failed
        });
    return currentRules.length > 0 ? asyncValidator : null;
}

function describeFields<T>(description: Interfaces.IDescription<T>) {
    return Object
        .keys(description)
        .map(name => {
            let { errors, warnings, ...props } = description[name];
            return {
                name,
                props,
                validate: createValidator(errors || {}),
                warn: createValidator(warnings || {}),
                asyncValidate: createAsyncValidator(errors),
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
                warn: field.validate,
                ...(field.props || {})
            };
            return acc;
        },{})
    }
}