import { default as messagesEN } from './messages/en';

type Rule = (value: any) => boolean;
type RuleFactory = (param: any) => Rule;

type AsyncRule = (value: any, dispatch) => Promise<boolean> | Promise<string>;
type AsyncRuleFactory = (param: any) => AsyncRule;

type MessageFactory = (field, param) => string;

const optional = (rule: Rule) => (value: any) => !value || rule(value);

export const rules = {
    required: () => value => !!value && (!Array.isArray(value) || value.length > 0),
    
    min: param => optional(value => value >= param),

    max: param => optional(value => value <= param),

    minLength: param => optional(value => value.length >= param),

    maxLength: param => optional(value => value.length <= param),

    pattern: (param: RegExp) => optional(value => param.test(value)),

    number: () => rules.pattern(/^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/),

    email: () => rules.pattern(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/),

    url: () => rules.pattern(/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i),

    date: () => optional(value => !/Invalid|NaN/.test( new Date( value ).toString())),

    dateISO: () => rules.pattern(/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/),

    digits: () => rules.pattern(/^\d+$/),
};
export const asyncRules = {
    promise: (func: AsyncRule) => (value, dispatch) => func(value, dispatch)
};

export const messages = messagesEN;

export const addRule = (name: string, ruleFactory: RuleFactory, messageFactory: MessageFactory) => {
    rules[name] = ruleFactory;
    messages[name] = messageFactory;
}
export const addAsyncRule = (name: string, ruleFactory: AsyncRuleFactory, messageFactory: MessageFactory) => {
    asyncRules[name] = ruleFactory;
    messages[name] = messageFactory;
}