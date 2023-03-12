import { useQuery, UseQueryOptions } from "react-query";
import { User } from "../../../@types/users";
import { fetchUsers } from "../../../api";

export type UseUserQueryOptions = Pick<UseQueryOptions<User[], Error, User[], string>, "enabled">;

const useUserQuery = ({
    enabled
}: UseUserQueryOptions) => useQuery(["users"], async () => {
    const users = await fetchUsers();
    
    return users;
}, {
    enabled: enabled
});

export {
    useUserQuery,
}