import { ulid } from "ulid";
import { User } from "../../@types/users";

let users: User[] = [];

const getTimeoutMilliseconds = () => {
    return 3000;
}
/**
 * Fetches all users
 * @returns {Promise<User[]>} all application users.
 */
const fetchUsers = (): Promise<User[]> => new Promise<User[]>((resolve) => {
    setTimeout(() => {
        resolve(users);
    }, getTimeoutMilliseconds());
});

const fetchUser = ({id}: {id: string}) => new Promise((resolve) => setTimeout(() => {
    const user = users.find((u) => u.id === id);
    resolve(user);
}));

const updateUser = ({
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

const createUser = ({
    email,
    username,
    password
}: {email: string, username: string, password: string}) => new Promise<User>((resolve) => {
    setTimeout(() => {
        const user: User = {
            id: ulid(),
            email,
            password,
            username,
            disabled: false,
        };
        users.push(user);
        resolve(user);
    }, getTimeoutMilliseconds())
})

export {
    createUser,
    fetchUsers,
    fetchUser,
    updateUser
}