import { useMutation } from "@tanstack/react-query";
import axiosClient from "../axiosClient";

const useRegisterUser = () => {
  return useMutation({
    mutationFn: (data: any) => {
      // console.log(data)
      return axiosClient.post("/auth/register", data);
    },
  });
};

export default useRegisterUser;
