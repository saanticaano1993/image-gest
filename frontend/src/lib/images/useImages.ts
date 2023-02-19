import { useQuery } from "@tanstack/react-query";
import { Order } from "../../components/dashboard/OrderSelector/OrderSelector";
import axiosClient from "../axiosClient";

const useImages = ({
  page,
  searchTerm,
  order,
}: {
  page: number;
  searchTerm: string;
  order: Order;
}) => {
  // console.log("THe search term is: ", searchTerm)
  return useQuery({
    queryKey: ["images", { page, searchTerm, order }],
    queryFn: async () =>
      axiosClient
        .get(
          `/images?page=${page}&limit=10${
            searchTerm ? `&search=${searchTerm}` : ""
          }${
            order.orderByFilesize
              ? `&orderByFilesize=${order.orderByFilesize}`
              : ""
          }${
            order.orderByUploadDate
              ? `&orderByUploadDate=${order.orderByUploadDate}`
              : ""
          }`
        )
        .then((res) => res.data),
  });
};

export default useImages;
