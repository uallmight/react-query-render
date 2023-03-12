import React from 'react';
import { UserTable } from '../../components';
import SpinnerLoader from '../../components/loaders/spinner';
import { useUserQuery } from '../../hooks';

const UserDashboard = () => {
    const {data: users, isLoading} = useUserQuery({enabled: true});

    return <SpinnerLoader loading={isLoading}>
        <UserTable users={users} />
    </SpinnerLoader>
};

export default UserDashboard;