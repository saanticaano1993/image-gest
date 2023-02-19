import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UploadImageInputs } from "../../pages/Upload";
import axiosClient from "../axiosClient";

const useUploadImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UploadImageInputs) => {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("image", data.image);
      formData.append(
        "description",
        "Description is not required for any images"
      );

      return axiosClient
        .post("/images", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => res.data);
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["images"] });
    },
  });
};

export default useUploadImage;
