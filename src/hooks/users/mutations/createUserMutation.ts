import { useMutation, useQueryClient } from "react-query";
import { User } from "../../../@types/users";
import { createUser } from '../../../api/index'

export type CreateUserMutationVariables = {
    username: string,
    password: string,
    email: string,
}

const useCreateUserMutation = () => {
    const queryClient = useQueryClient();

    return useMutation<User, Error, CreateUserMutationVariables, unknown>(async ({
        username,
        password,
        email
    }: CreateUserMutationVariables) => {
        const user = await createUser({
            email,
            username,
            password
        });
        await queryClient.invalidateQueries(["users"]); // invalidate the query to force API call to refetch data.
        return user;
    });
};

export {
    useCreateUserMutation
}