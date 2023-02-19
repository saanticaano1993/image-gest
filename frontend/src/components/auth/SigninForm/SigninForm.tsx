import { useForm } from "react-hook-form";
import { validateName, validatePassword } from "../../../helpers/form-validators"
import { LoaderButton } from "../../buttons";
import { GenericInput } from "../../inputs";

export type SignInFormInputs = {
  username: string;
  password: string;
}

type Props = {
  onSubmit: (values: SignInFormInputs) => void;
};


const SigninForm = ({ onSubmit }: Props) => {
  const {
    register,
    formState: { isSubmitting, errors },
    reset,
    handleSubmit,
  } = useForm<SignInFormInputs>();

  return (
    <form className="p-4 py-6 max-w-sm mx-auto bg-white rounded-md" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-3xl font-bold text-center">Login</h1>
      <div className="flex mt-4 flex-col space-y-3">
        <GenericInput
          id="username"
          label="Username"
          type="text"
          error={errors.username}
          {...register("username", { validate: validateName })}
        />
        <GenericInput
          id="password"
          label="Password"
          type="password"
          error={errors.password}
          {...register("password", { validate: validatePassword })}
        />
      </div>
      <LoaderButton
        className="px-3 py-2 mt-4 bg-black mx-auto text-white"
        loading={isSubmitting}
        type="submit"
        label="Login"
      />
    </form>
  );
};

export default SigninForm;
