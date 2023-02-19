import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosClient from "../axiosClient";

const useUpdateUsername = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { username: string; oldPassword: string }) =>
      axiosClient.put(`/users/${userId}`, data).then((res) => res.data),
    onSuccess: (data) => {
      queryClient.setQueryData(["me"], { user: data });
    },
  });
};

export default useUpdateUsername;
