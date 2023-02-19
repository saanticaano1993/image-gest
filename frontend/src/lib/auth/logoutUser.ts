import queryClient from "../reactQueryClient";

const logoutUser = async () => {
  localStorage.removeItem("token");
  queryClient.setQueryData(["me"], null);
}

export default logoutUser