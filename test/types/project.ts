import { sleep } from './../utils';
import { describeType } from './../../src';

export type Member = {
    email: string,
}

export type Project = {
    name: string,
    members: Member[],
    leader: Member
}

const memberDescriptor = describeType<Member>({
    email: {
        errors: {
            promise: (value, _) => sleep(50).then(() => value === 'non-unique@mail.com' ? 'Non unique e-mail' : true)
        }
    }
})

export const projectDescription = {
    name: {
        errors: {
            promise: (value, _) => sleep(50).then(() => true)
        }
    },
    members: {
        arrayDescriptor: memberDescriptor,
    },
    leader: {
        typeDescriptor: memberDescriptor
    }
};
export const projectDescriptor = describeType<Project>(projectDescription);