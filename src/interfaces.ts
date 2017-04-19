export type IDescription<T> = {
    [P in keyof T]?: IFieldDescription<T[P]>
};

type IFieldDescription<T> = {
    label?: string,
    placeholder?: string,
    descriptor?,
    errors?,
    warnings?
};

export type IDescriptor<T> = {
    form,
    fields: IFieldDescriptors<T>
};

export type IFormDescriptor = {
    validate,
    asyncValidate,
    async
    warn,

}

export type IFieldDescriptors<T> = {
    [P in keyof T]?: IFieldDescriptor
}

export type IFieldDescriptor = {
    name?,
    label?,
    placeholder?,
    validate?,
    warn?
}