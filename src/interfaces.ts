export type IDescription<T> = {
    [P in keyof T]?: IFieldDescription<T[P]>
} & {
    $form?: any
};

export type IFieldDescription<T> = {
    label?: string,
    placeholder?: string,
    typeDescriptor?,
    arrayDescriptor?,
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