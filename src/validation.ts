import { rules, asyncRules, messages } from './rules';

export function combineAsyncValidators(fields) {
    return (values, dispatch) => Promise
        .all(fields.map(f => f.asyncValidator(values[f.name], dispatch, values)))
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

    return (value, allValues) => {
        let context = createContext(allValues);
        return currentRules
            .map(rule => mapToErrorResult(rule, value, context))
            .filter(result => result !== undefined)[0];
    }
}

export function createAsyncValidator(errors) {
    let currentRules = Object.keys(errors)
        .filter(rule => asyncRules[rule])
        .map(rule => asyncRules[rule](errors[rule]));

    let asyncValidator = (value, dispatch, allValues) => {
        let context = createContext(allValues);
        return Promise
            .all(currentRules.map(rule => rule(value, dispatch, context)))
            .then(results => {
                return results[0]; // todo: return first that failed
            });
    };
    return currentRules.length > 0 ? asyncValidator : null;
}

function createRule(rule, param, field) {
    return {
        rule: rules[rule](param),
        message: () => messages[rule](field, param)
    };
}

function mapToErrorResult(rule, value, context) {
    return rule.rule(value, context) ? undefined : rule.message();
}

function createContext(allValues) {
    return { object: allValues };
}