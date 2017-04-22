import { rules, asyncRules, messages } from './rules';

export function combineAsyncValidators(fields) {
    return (values, dispatch) => Promise
        .all(fields.map(f => f.asyncValidator(values[f.name], dispatch)))
        .then(errors => fields
            .map((field, index) => ({ name: field.name, error: errors[index] }))
            .filter(field => field.error)
            .reduce((errors, field) => (errors[field.name] = field.error, errors), {})
        );
}

export function createValidator(errors, field) {
    let currentRules = Object.keys(errors)
        .filter(rule => rules[rule])
        .map(rule => createRule(rule, errors[rule], field));

    return value => currentRules
        .map(rule => mapToErrorResult(rule, value))
        .filter(result => result !== undefined)[0]; // todo: return first that failed
}

export function createAsyncValidator(errors) {
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

function createRule(rule, param, field) {
    return {
        rule: rules[rule](param),
        message: () => messages[rule](field, param)
    };
}

function mapToErrorResult(rule, value) {
    return rule.rule(value) ? undefined : rule.message();
}