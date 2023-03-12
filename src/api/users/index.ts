import { User } from "../../@types/users";

let users: User[] = [];

const getTimeoutMilliseconds = () => {
    return 3000;
}
/**
 * Fetches all users
 * @returns {User[]} all application users.
 */
const fetchUsers = () => new Promise<User[]>((resolve) => {
    setTimeout(() => {
        resolve(users);
    }, getTimeoutMilliseconds());
});

const fetchUser = ({id}: {id: string}) => new Promise((resolve) => setTimeout(() => {
    const user = users.find((u) => u.id === id);
    resolve(user);
}));

const updateuser = ({
    id,
    email,
    username,
    password,
    disabled
}: User) => new Promise((resolve) => setTimeout(() => {
    users = users.map((user) => {
        if (user.id === id) {
            user.disabled = disabled;
            user.email = email;
            user.password = password;
            user.username = username;
        }
        return user; // no update necessary
    })
}, getTimeoutMilliseconds()))

export {
    fetchUsers,
    fetchUser,
    updateuser
}