import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosClient from "../axiosClient";

const useUpdateTitle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { imageId: string; title: string }) =>
      axiosClient
        .put(`/images/${data.imageId}`, { title: data.title })
        .then((res) => res.data),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["images"] });
    },
  });
};

export default useUpdateTitle;
