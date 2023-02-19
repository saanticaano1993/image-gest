import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  validateConfirmPassword,
  validatePassword,
} from "../../../helpers/form-validators";
import useAuth from "../../../lib/auth/useAuth";
import useUpdatePassword from "../../../lib/auth/useUpdatePassword";
import { LoaderButton } from "../../buttons";
import { GenericInput } from "../../inputs";

type FormTypes = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const UpdatePasswordForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormTypes>();

  const auth = useAuth();

  const updatePassword = useUpdatePassword(auth.data.user._id);

  const submitHandler = (data: FormTypes) =>
    updatePassword.mutate({
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    });

  useEffect(() => {
    if (updatePassword.isError) {
      toast.error("Error al actualizar contraseña");
    }

    if (updatePassword.data) {
      toast.success("Contraseña actualizada correctamente");
    }
  }, [updatePassword.isLoading]);

  return (
    <form
      className="flex flex-col space-y-2"
      onSubmit={handleSubmit(submitHandler)}>
      <GenericInput
        id="oldPassword"
        label="Contraseña actual"
        type="password"
        error={errors.oldPassword}
        {...register("oldPassword")}
      />

      <GenericInput
        id="newPassword"
        label="Nueva Contraseña"
        type="password"
        error={errors.newPassword}
        {...register("newPassword", { validate: validatePassword })}
      />

      <GenericInput
        id="confirmPassword"
        label="Confirmar "
        type="password"
        error={errors.confirmPassword}
        {...register("confirmPassword", {
          validate: (confirmPassword: string) =>
            validateConfirmPassword(watch("newPassword"), confirmPassword),
        })}
      />

      <LoaderButton
        loading={updatePassword.isLoading}
        className="px-3 py-1.5 mt-3 bg-black text-white"
        label="Actualizar Contraseña"
        type="submit"
      />
    </form>
  );
};

export default UpdatePasswordForm;
