import { rules, asyncRules, messages } from './rules';

export function combineAsyncValidators(fields) {
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
        return currentRules.joinResults(currentRules.rules
            .map(rule => ({ result: rule.validate(value, context), rule }))
            .map(({ result, rule }) => rule.normalizeResult(result)));
    }
}

export function createAsyncValidator(errors, field) {
    let currentRules = getRules(asyncRules, errors, field);
    let asyncValidate = (value, dispatch, allValues) => {
        let context = createContext(allValues);
        return Promise
            .all(currentRules.rules.map(rule => rule.validate(value, dispatch, context)))
            .then(results => currentRules.joinResults(currentRules.rules
                .map((rule, index) => ({ result: results[index], rule}))
                .map(({ result, rule}) => rule.normalizeResult(result)))
            );
    };

    return {
        asyncValidate: currentRules.rules.length > 0 ? asyncValidate : null,
        asyncBlurFields: currentRules.rulePaths
    };
}

function getFieldDescriptor(field) {
    return field.typeDescriptor || field.arrayDescriptor;
}

function getRules(ruleset, errors, field) {
    let simpleRules = Object.keys(errors)
        .filter(rule => ruleset[rule])
        .map(rule => createSimpleRule(ruleset, rule, errors[rule], field));
    
    let fieldDescriptor = getFieldDescriptor(field);
    if (fieldDescriptor) {
        let prefix = field.arrayDescriptor ? `${field.name}[].` : `${field.name}.`;
        return {
            rules: [createComplexRule(field), ...simpleRules],
            joinResults,
            rulePaths: fieldDescriptor.form.asyncBlurFields.map(x => prefix + x),
        };
    } else {
        return {
            rules: simpleRules,
            joinResults: results => results.filter(r => r !== undefined)[0],
            rulePaths: simpleRules.length > 0 ? [field.name] : []
        };
    }
}

function joinResults(results) {
    let [complexResult, ...simpleResults] = results;
    let _error = simpleResults.filter(r => r !== undefined)[0];
    let errors = {
        ...complexResult
    };
    if (_error) {
        errors._error = _error;
    }
    return Object.keys(errors).length > 0 ? errors : undefined;
}

function createSimpleRule(rules, rule, param, field) {
    return {
        validate: rules[rule](param),
        normalizeResult: result => normalizeResult(result, () => messages[rule](field, param))
    };
}

function createComplexRule(field) {
    return {
        validate: value => {
            return !value || (field.arrayDescriptor ? value.map(item => field.arrayDescriptor.form.validate(item)) : field.descriptor.form.validate(value));
        },
        normalizeResult: result => result
    }
}

function validate(rule, value, context) {
    return rule.rule(value, context);
}

function normalizeResult(result, message) {
    if (typeof result === 'string') {
        return result;
    } else {
        return result ? undefined : message();
    }
}

function createContext(allValues) {
    return { object: allValues };
}