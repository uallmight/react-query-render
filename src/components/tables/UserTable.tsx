import React from 'react';
import { User } from '../../@types/users';
import { DisabledSvg } from '../icons';
import { EditInput } from '../inputs';

export type UserTableProps = {
    users?: User[]|null,
};

export type UserTableRowProps = {
    editable?: boolean,
} & Pick<User, "email"|"username"|"password"|"disabled"|"id">;

const UserTableRow = ({
    editable,
    id,
    email,
    username,
    password,
    disabled,
}: UserTableRowProps): JSX.Element => {
    const handleSave = () => {

    };

    return (<tr>
        <td>{id}</td>
        <td>
            <EditInput onSave={(email) => console.debug(email)} type="email">
                <span>{email}</span>
            </EditInput>
        </td>
        <td>
            <EditInput onSave={(username) => console.debug(username)} type="text">
                <span>{username}</span>
            </EditInput>
        </td>
        <td>            
            <EditInput onSave={(password) => console.debug(password)} type="password">
                <span>{password}</span>
            </EditInput></td>
        <td>{disabled ? <DisabledSvg /> : null}</td>
    </tr>)
}

const UserTable = ({
    users
}: UserTableProps): JSX.Element => {
    return (<table>
        <thead>
            <tr>
                <th>ID</th>
                <th>E-Mail</th>
                <th>Username</th>
                <th>Password</th>
                <th>Actions</th>
            </tr>
        </thead>
        <body>
            {users?.length ? (users.map((user) => <UserTableRow id={user.id} disabled={user.disabled} email={user.email} password={user.password} editable username={user.username} />)) : null}
        </body>
    </table>)
};

export default UserTable;