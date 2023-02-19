import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosClient from "../axiosClient";

const useDeleteImage = () => {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (imageId: string) =>
      axiosClient.delete(`/images/${imageId}`).then((res) => res.data),
    onSuccess: (res) => {
      console.log(res);
      queryClient.invalidateQueries({ queryKey: ["images"] });
    },
  });
};

export default useDeleteImage;
