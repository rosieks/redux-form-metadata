import { describeType } from './../../src'

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