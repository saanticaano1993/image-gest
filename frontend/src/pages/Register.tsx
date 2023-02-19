import axios from "axios";
import { ReactElement, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SignupForm, {
  SignUpFormInputs,
} from "../components/auth/SignupForm/SignupForm";
import useRegisterUser from "../lib/auth/useRegisterUser";

const Register = () => {
  const registerUser = useRegisterUser();
  const navigate = useNavigate();

  const submitHandler = async (values: SignUpFormInputs) =>
    registerUser.mutate({
      username: values.username,
      password: values.password,
      email: values.email,
    });

  useEffect(() => {
    if (registerUser.error) toast.error("Error registering user");
    if (registerUser.data) {
      console.log(registerUser.data);
      toast.success("User created successfully");
      navigate("/");
    }
  }, [registerUser.isLoading]);

  return (
    <div className="my-10 sm:my-24">
      <h1 className="text-center text-4xl font-bold uppercase mb-10">
        Image Gest
      </h1>
      <SignupForm onSubmit={submitHandler} />
      <div className="text-center -mt-4">
        <Link to="/">
          <span className="text-neutral-400 hover:text-neutral-600">login</span>
        </Link>
      </div>
    </div>
  );
};

export default Register;
