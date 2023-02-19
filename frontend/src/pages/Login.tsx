import { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import SigninForm, {
  SignInFormInputs,
} from "../components/auth/SigninForm/SigninForm";

import useLoginUser from "../lib/auth/useLoginUser";

const LoginPage = () => {
  const loginUser = useLoginUser();

  const submitHandler = async (values: SignInFormInputs) =>
    loginUser.mutate({ username: values.username, password: values.password });

  useEffect(() => {
    if (loginUser.error) {
      toast.error("Error logging in user")
    };
  }, [loginUser.isLoading]);



  return (
    <div className="my-10 sm:my-24">
      <h1 className="text-center text-4xl font-bold uppercase mb-10">
        Image Gest
      </h1>
      <SigninForm onSubmit={submitHandler} />
      <div className="text-center -mt-4">
        <Link to="/register">
          <span className="text-neutral-400 hover:text-neutral-600">
            register
          </span>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
