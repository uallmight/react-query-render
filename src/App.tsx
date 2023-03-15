import React, { useState } from 'react';
import { UserDashboard } from './containers';
import { AddUserForm } from './containers/users';
import { useCreateUserMutation } from './hooks/users/mutations';

function App() {

  const [addingUser, setAddingUser] = useState<boolean>(false);

  const createUserMutation = useCreateUserMutation();

  const onAddUserFormSubmit = async (values: { email: string, password: string, username: string }) => {
    try {
      await createUserMutation.mutateAsync({
        email: values.email,
        username: values.username,
        password: values.password
      });
    } catch (reason) {
      console.error(reason);
    } finally {
      setAddingUser(false);
    }
  }

  return (addingUser ? <AddUserForm onSubmit={onAddUserFormSubmit} /> : (<div>
    <button type="button" onClick={() => setAddingUser(true)}>Add User</button>
    <UserDashboard />
  </div>));
}

export default App;
