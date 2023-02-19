import React, { useState } from "react";
import { ImageCardLoader } from "../components/loaders";
import {
  Grid,
  ImageCard,
  Modal,
  PaginationBar,
  SearchBar,
} from "../components/ui";
import { backendUrl } from "../config";
import {
  DeleteImageConfirmation,
  EditTitleForm,
  OrderSelector,
} from "../components/dashboard";

import useImages from "../lib/images/useImages";

type Props = {};

const Dashboard = (props: Props) => {
  const [modalState, setModalState] = useState<{
    modal: "edit" | "delete" | null;
    id: string | null;
    title?: string;
  }>({ modal: null, id: null });

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [order, setOrder] = React.useState<{
    orderByUploadDate: "desc" | "asc" | null;
    orderByFilesize: "desc" | "asc" | null;
  }>({ orderByUploadDate: "desc", orderByFilesize: null });

  const images = useImages({ page, searchTerm, order });

  const closeModal = () =>
    setModalState((prevState) => ({ ...prevState, modal: null }));

  const setSearchAndResetPage = (value: string) => {
    setPage(1);
    setSearchTerm(value);
  };

  // if (images.isLoading) return <div>Loading...</div>;
  // if (images.isError) return <div>Error fetching images</div>;
  // if (images.data.length === 0) return <div>No Images Found</div>;

  return (
    <div className="mt-10 px-3">
      <Modal
        isOpen={modalState.modal === "delete"}
        title="Borrar Imagen"
        content={
          <DeleteImageConfirmation
            title={modalState.title as string}
            imageId={modalState.id as string}
            closeModal={closeModal}
          />
        }
        closeModal={closeModal}
      />

      <Modal
        isOpen={modalState.modal === "edit"}
        title="Editar Título Imagen"
        content={
          <EditTitleForm
            defaultTitle={modalState.title as string}
            imageId={modalState.id as string}
            closeModal={closeModal}
          />
        }
        closeModal={closeModal}
      />
      <h1 className="text-center text-3xl font-bold mb-10">Mis Imagenes</h1>
      <div className="my-8 mb-10 max-w-sm mx-auto">
        <SearchBar search={setSearchAndResetPage} />
      </div>

      <div className="flex justify-end max-w-sm sm:max-w-none xl:max-w-5xl mx-auto">
        <OrderSelector setOrder={(order) => setOrder(order)} />
      </div>

      <div className="flex justify-center my-10">
        <PaginationBar currentPage={page} setPage={setPage} totalPages={Math.ceil(images.data?.count / 10 || 1)} />
      </div>
      <Grid
        items={images?.data?.images?.map((image: any) => ({
          id: image._id,
          title: image.title,
          url: backendUrl + "/" + image.slug,
        }))}
        loader={<ImageCardLoader />}
        isLoading={images.isLoading}
        renderItem={(image: any) => (
          <ImageCard
            onClickDelete={(id) =>
              setModalState({ id, modal: "delete", title: image.title })
            }
            onClickEdit={(id) =>
              setModalState({ id, modal: "edit", title: image.title })
            }
            {...image}
            key={image.id}
          />
        )}
      />
    </div>
  );
};

export default Dashboard;
