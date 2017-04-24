import { describeType } from './../src'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export type Address = {
    street: string,
    city: string
};

export type Customer = {
    name: string,
    age: number,
    dateOfBirth: number,
    addresses: Address[],
    email: string,
    phone: string
};

export type ChangePassword = {
    oldPassword: string,
    newPassword: string,
    confirmPassword: string,
}

export const changePasswordDescription = {
    oldPassword: {
        errors: {
            required: true,
        }
    },
    newPassword: {
        errors: {
            required: true,
            validate: value => {
                if (/[A-Z]/.test(value) && /[0-9]/.test(value) && value.length >= 8) {
                    return true;
                } else {
                    return 'New password is too weak';
                }
            }
        }
    },
    confirmPassword: {
        errors: {
            required: true,
            equalTo: 'newPassword'
        }
    }
}
export const changePasswordDescriptor = describeType<ChangePassword>(changePasswordDescription);

export const addressDescription = {
    street: {
        label: 'Street',
    },
    city: {
        label: 'City'
    }
};
export const addressDescriptor = describeType<Address>(addressDescription);

export const customerDescription = {
    name: {
        label: 'Name',
        placeholder: 'Enter your name',
        errors: {
            required: true,
            maxLength: 30,
            promise: (value, _) => sleep(50).then(() => value === 'async' ? true : "Invalid name"), 
        },
        warnings: {
            minLength: 2
        }
    },
    age: {
        label: 'Age',
        errors: {
            required: true,
            number: true
        },
        warnings: {
            min: 18
        }
    },
    addresses: {
        label: 'Addresses',
        descriptor: addressDescriptor,
        errors: {
            required: true
        }
    },
    email: {
        label: 'E-mail',
        errors: {
            required: true,
            email: true,
            promise: (value, _) => sleep(50).then(() => value === "async@test" ? true : "Invalid e-mail")
        }
    },
    phone: {
        label: 'Phone',
        errors: {
            pattern: /\d{9}/i
        }
    }
};

export const customerDescriptor = describeType<Customer>(customerDescription);