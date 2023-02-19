import React from "react";
/*
const [order, setOrder] = React.useState<{
    orderByUploadDate: "desc" | "asc" | null;
    orderByFilesize: "desc" | "asc" | null;
  }>({ orderByUploadDate: "desc", orderByFilesize: null });
*/

export type Order = {
  orderByUploadDate: "desc" | "asc" | null;
  orderByFilesize: "desc" | "asc" | null;
}

type Props = {
  setOrder: (order: Order) => void;
};

const OrderSelector = ({ setOrder }: Props) => {
  const handleOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    switch (value) {
      case "ur":
        setOrder({ orderByUploadDate: "desc", orderByFilesize: null });
        break;
      case "uo":
        setOrder({ orderByUploadDate: "asc", orderByFilesize: null });
        break;
      case "sl":
        setOrder({ orderByUploadDate: null, orderByFilesize: "desc" });
        break;
      case "sm":
        setOrder({ orderByUploadDate: null, orderByFilesize: "asc" });
        break;
      default:
        setOrder({ orderByUploadDate: "desc", orderByFilesize: null });
        break;
    }
  };

  return (
    <div className="w-fit">
      <label className="block font-semibold" htmlFor="sorter">
        Ordenar Por:
      </label>
      <select
        onChange={handleOrderChange}
        className="p-1 rounded-md"
        name="sort"
        id="sorter">
        <option value="ur">Fecha Subida: Mas Reciente</option>
        <option value="uo">Fecha Subida: Mas Antigua</option>
        <option value="sl">Tamaño: Mayor</option>
        <option value="sm">Tamaño: Menor</option>
      </select>
    </div>
  );
};

export default OrderSelector;
