import React from "react";
import { useNavigate } from "react-router-dom";
import { SimpleButton } from "../components/buttons";
import UpdatePasswordForm from "../components/profile/UpdatePasswordForm/UpdatePasswordForm";
import UpdateUsernameForm from "../components/profile/UpdateUsernameForm/UpdateUsernameForm";
import logoutUser from "../lib/auth/logoutUser";

type Props = {};

const Profile = (props: Props) => {
  const navigate = useNavigate();

  const logout = () => {
    logoutUser();
    navigate("/");
  };

  return (
    <div className="mt-5">
      <h1 className="text-center text-3xl font-bold">Perfil</h1>

      <div className="mx-auto max-w-lg">
        <h2 className="text-xl font-semibold mt-5 mb-3 ml-2">
          Account Settings
        </h2>
        <div className="bg-slate-100 p-2 py-3 pb-5 flex flex-col space-y-8 sm:rounded-md sm:p-3">
          <UpdateUsernameForm />
          <UpdatePasswordForm />
        </div>
        <div className="flex justify-center">
          <SimpleButton
            label="Logout"
            onClick={logout}
            className="px-3 py-2 mt-4 bg-red-500 mx-auto text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
