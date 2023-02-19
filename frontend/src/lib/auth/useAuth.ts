import { useQuery } from "@tanstack/react-query";
import axiosClient from "../axiosClient";

// async function fetchMe() {
//   // return axiosClient.get("/me").then((res) => res.data);

// }

const useAuth = () => {
  return useQuery(["me"], () =>
    axiosClient.get("/auth/me").then((res) => {
      // console.log(res);
      return res.data;
    })
  );
};

export default useAuth;
