import { ReactElement } from "react";

type Props<T> = {
  renderItem: (item: T, index: number) => ReactElement;
  items: T[] | undefined;
  isLoading?: boolean;
  loader?: ReactElement;
  numLoaders?: number;
};

const Grid = <T,>({
  renderItem,
  items,
  isLoading,
  loader,
  numLoaders = 4,
}: Props<T>) => {
  return (
    <>
      <div className="relative grid pb-10 mx-auto grid-cols-1 gap-y-10 sm:grid-cols-2 sm:gap-10 max-w-sm sm:max-w-none lg:grid-cols-3 xl:max-w-5xl xl:mx-auto">
        {items &&
          !isLoading &&
          items.map((item, index) => (
            <div key={index + numLoaders + 1}>{renderItem(item, index)}</div>
          ))}

        {isLoading &&
          [...Array(numLoaders)].map((value, index) => (
            <div key={index}>{loader}</div>
          ))}
      </div>
      {items && items.length === 0 && !isLoading && (
        <div className="text-center text-xl font-semibold mt-5 mb-3 ml-2">
          Aun no hay imagenes...
        </div>
      )}
    </>
  );
};

export default Grid;
