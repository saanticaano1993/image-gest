import { useMutation } from "@tanstack/react-query";
import axiosClient from "../axiosClient";

const useUpdatePassword = (userId: string) => {
  return useMutation({
    mutationFn: async (data: { oldPassword: string; newPassword: string }) =>
      axiosClient.put(`/users/${userId}`, data).then((res) => res.data),
  });
};

export default useUpdatePassword;
