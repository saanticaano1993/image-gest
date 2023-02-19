import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAuth from "../../../lib/auth/useAuth";
import useUpdateUsername from "../../../lib/auth/useUpdateUsername";
import { LoaderButton } from "../../buttons";
import { GenericInput } from "../../inputs";

type FormTypes = {
  username: string;
  password: string;
};

const UpdateUsernameForm = () => {
  const auth = useAuth();

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormTypes>({
    defaultValues: { username: auth.data.user.username },
  });

  const updateUsername = useUpdateUsername(auth.data.user._id);

  const submitHandler = (data: FormTypes) =>
    updateUsername.mutate({
      username: data.username,
      oldPassword: data.password,
    });

  useEffect(() => {
    if (updateUsername.isError)
      toast.error("An error occured when updating your username");

    if (updateUsername.data) {
      toast.success("Successfully updated your username.");
    }
  }, [updateUsername.isLoading]);

  return (
    <form className="flex flex-col space-y-3" onSubmit={handleSubmit(submitHandler)}>
      <GenericInput
        id="username"
        label="Username"
        error={errors.username}
        type="text"
        {...register("username")}
      />
      <GenericInput
        id="password"
        label="Contraseña"
        error={errors.password}
        type="password"
        {...register("password")}
      />

      <LoaderButton
        loading={updateUsername.isLoading}
        disabled={watch("username").trim() === auth.data.user.username}
        className="px-3 py-1.5 h-fit bg-black text-white"
        label="Actualizar Username"
        type="submit"
      />
    </form>
  );
};

export default UpdateUsernameForm;
