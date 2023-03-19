import { ulid } from "ulid";
import { User } from "../../@types/users";
import { generateUsername } from 'friendly-username-generator';
import passwordGenerator from 'secure-random-password';

// seed the users initially
let users: User[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((value) => {
  const username = generateUsername();
  return {
    id: ulid(),
    username: username,
    email: `${username}@example.com`,
    password: passwordGenerator.randomPassword(),
    disabled: value % 4 === 0,
  }
})

const getTimeoutMilliseconds = () => {
  return 3000;
};
/**
 * Fetches all users from API
 * @returns {Promise<User[]>} all application users.
 */
const fetchUsers = (): Promise<User[]> =>
  new Promise<User[]>((resolve) => {
    setTimeout(() => {
      resolve(users);
    }, getTimeoutMilliseconds());
  });

export type FetchUserRequest = {
  /**
   * ID of user to get
   */
  id: string
}
/**
 * Gets a user by their ID or throws an error if they are not found
 * @param {FetchUserRequest} params  
 * @returns {Promise<User>}
 * @throws {Error} no user found
 */
const fetchUser = ({ id }: FetchUserRequest): Promise<User> =>
  new Promise((resolve) =>
    setTimeout(() => {
      const user = users.find((u) => u.id === id);
      if (!user) {
        throw new Error(`No user found with the ID ${id}`);
      }
      resolve(user);
    })
  );
/**
 * Updates an existing user
 * @param {User} param0 user object with updates. All fields can be changed with the exception of the ID property
 * @returns {Promise<User>} returns the updated user information
 * @throws {Error} no user found
 */
const updateUser = ({
  id,
  email,
  username,
  password,
  disabled
}: User) =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      users = users.map((user) => {
        if (user.id === id) {
          user.disabled = disabled;
          user.email = email;
          user.password = password;
          user.username = username;
        }
        return user; // no update necessary
      });
      fetchUser({ id }).then((resolve)).catch((reject));
    }, getTimeoutMilliseconds())
  );
export type CreateUserRequest = Pick<User, "email" | "password" | "username">;
/**
 * Creates a new user.
 * @param {CreateUserRequest} param0 
 * @returns {Promise<User>} newly created user and data.
 */
const createUser = ({
  email,
  username,
  password,
}: CreateUserRequest) =>
  new Promise<User>((resolve, reject) => {
    setTimeout(() => {
      const user: User = {
        id: ulid(),
        email,
        password,
        username,
        disabled: false,
      };
      users = [...users, user];
      fetchUser(({ id: user.id })).then((resolve)).then((reject));
    }, getTimeoutMilliseconds());
  });

export { createUser, fetchUsers, fetchUser, updateUser };
