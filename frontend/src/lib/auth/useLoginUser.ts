import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useCallback } from "react";
import axiosClient from "../axiosClient";

const useLoginUser = () => {
  const queryClient = useQueryClient();

  const setUser = useCallback((data: any) => {
    console.log("Setting the user: ", data);
    queryClient.setQueryData(["me"], { user: data });
  }, []);

  return useMutation({
    mutationFn: (data: any) =>
      axiosClient.post<any, AxiosResponse<any, any>>("/auth/login", data),
    onSuccess: (res) => {
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
    },
  });
};

export default useLoginUser;
