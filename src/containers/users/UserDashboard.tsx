import React from "react";
import { UserTable } from "../../components";
import SpinnerLoader from "../../components/loaders/spinner";
import { useUserQuery } from "../../hooks";
import { useNavigate } from "react-router";
import { PrimaryButton } from "../../components/buttons";

const UserDashboard = () => {
  const navigation = useNavigate();

  const { data: users, isLoading } = useUserQuery({ enabled: true });

  return (
    <div>
      <div className="grow flex flex-row items-end">
        <PrimaryButton onClick={() => navigation("/users/add")}>
          Create User
        </PrimaryButton>
      </div>
      {isLoading ? (<SpinnerLoader />) : (<UserTable users={users} />)}
    </div>
  );
};

export default UserDashboard;
