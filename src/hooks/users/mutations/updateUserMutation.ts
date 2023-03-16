import { useMutation, useQueryClient } from "react-query";
import { User } from "../../../@types/users";
import { updateUser } from "../../../api";

const useUpdateUserMutation = () => {
    const queryClient = useQueryClient();

    return useMutation(async (user: User) => {
        const updatedUser = await updateUser(user);
        return updatedUser;
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries(["users"]);
        }
    })
}

export {
    useUpdateUserMutation,
}