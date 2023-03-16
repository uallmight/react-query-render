import React from "react";
import { User } from "../../@types/users";
import { useUpdateUserMutation } from "../../hooks/users/mutations";
import { DisabledSvg } from "../icons";
import { EditInput } from "../inputs";

export type UserTableProps = {
  users?: User[] | null;
};

export type UserTableRowProps = {
  editable?: boolean;
} & Pick<User, "email" | "username" | "password" | "disabled" | "id">;

const UserTableRow = ({
  editable,
  id,
  email,
  username,
  password,
  disabled,
}: UserTableRowProps): JSX.Element => {
  const updateUser = useUpdateUserMutation();
  
  const handleSave = async (user: User) => {
    await updateUser.mutateAsync(user);
  };

  return (
    <tr>
      {/* <td>{id}</td> */}
      <td className="p-2">
        <EditInput onSave={(email: string) => handleSave({id, email, username, password})} type="email" initialValue={email}>
          <span className="grow">{email}</span>
        </EditInput>
      </td>
      <td className="p-2">
        <EditInput onSave={(username) => handleSave({id, email, username, password})} type="text" initialValue={username}>
          <span className="grow">{username}</span>
        </EditInput>
      </td>
      <td className="p-2">
        <EditInput
          onSave={(password) => handleSave({id, email, username, password})}
          type="password"
          initialValue={password}
        >
          <span className="grow">{password}</span>
        </EditInput>
      </td>
      <td className="p-2">Delete</td>
    </tr>
  );
};

const UserTable = ({ users }: UserTableProps): JSX.Element => {
  return (
    <table>
      <thead>
        <tr>
          {/* <th className="text-center">ID</th> */}
          <th className="text-left">E-Mail</th>
          <th className="text-left">Username</th>
          <th className="text-left">Password</th>
          <th className="text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users?.length
          ? users.map((user) => (
              <UserTableRow
                key={user.id}
                id={user.id}
                disabled={user.disabled}
                email={user.email}
                password={user.password}
                editable
                username={user.username}
              />
            ))
          : null}
      </tbody>
    </table>
  );
};

export default UserTable;

