import * as CustomerType from './customer';
import * as ChangePasswordType from './changePassword';
import * as ProjectType from './project';

export type Customer = CustomerType.Customer;
export const customerDescription = CustomerType.customerDescription;
export const customerDescriptor = CustomerType.customerDescriptor;

export type ChangePassword = ChangePasswordType.ChangePassword;
export const changePasswordDescription = ChangePasswordType.changePasswordDescription;
export const changePasswordDescriptor = ChangePasswordType.changePasswordDescriptor;

export const projectDescriptor = ProjectType.projectDescriptor;