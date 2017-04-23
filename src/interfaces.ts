export type IDescription<T> = {
    [P in keyof T]?: IFieldDescription<T[P]>
};

export type IFieldDescription<T> = {
    label?: string,
    placeholder?: string,
    descriptor?,
    errors?,
    warnings?
};

export type IDescriptor<T> = {
    form: IFormDescriptor,
    fields: IFieldDescriptors<T>
};

export type IFormDescriptor = {
    validate,
    asyncValidate,
    asyncBlurFields: string[]
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