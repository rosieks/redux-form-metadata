import { rules, asyncRules, messages } from './rules';

export function combineAsyncValidators(fields) {
    debugger;
    return (values, dispatch, _, blurredField) => {
        let fieldsToValidate = fields.filter(f => !blurredField || f.name === blurredField);
        return Promise
            .all(fieldsToValidate.map(f => f.asyncValidate(values[f.name], dispatch, values)))
            .then(errors => {
                let invalidFields = fieldsToValidate
                    .map((field, index) => ({ name: field.name, error: errors[index] }))
                    .filter(field => field.error);

                if (invalidFields.length > 0) {
                    let errorsMap = invalidFields
                        .reduce((errors, field) => (errors[field.name] = field.error, errors), {});
                    throw errorsMap;
                }
            });
    };
}

export function createValidator(errors, field) {
    let currentRules = getRules(rules, errors, field);
    return (value, allValues) => {
        let context = createContext(allValues);
        return currentRules
            .map(rule => ({ result: rule.validate(value, context), rule }))
            .map(result => normalizeResult(result))
            .filter(result => result !== undefined)[0];
    }
}

export function createAsyncValidator(errors, field) {
    let currentRules = getRules(asyncRules, errors, field);
    let asyncValidator = (value, dispatch, allValues) => {
        let context = createContext(allValues);
        return Promise
            .all(currentRules.map(rule => rule.validate(value, dispatch, context)))
            .then(results => currentRules
                .map((rule, index) => ({ result: results[index], rule}))
                .map(result => normalizeResult(result))
                .filter(result => result !== undefined)[0]
            );
    };
    return currentRules.length > 0 ? asyncValidator : null;
}

function getRules(ruleset, errors, field) {
    return Object.keys(errors)
        .filter(rule => ruleset[rule])
        .map(rule => createRule(ruleset, rule, errors[rule], field));
}

function createRule(rules, rule, param, field) {
    return {
        validate: rules[rule](param),
        message: () => messages[rule](field, param)
    };
}

function validate(rule, value, context) {
    return rule.rule(value, context);
}

function normalizeResult({ result, rule }) {
    if (typeof result === 'string') {
        return result;
    } else {
        return result ? undefined : rule.message();
    }
}

function createContext(allValues) {
    return { object: allValues };
}