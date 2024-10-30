import React from "react";
import { useShallow } from "zustand/react/shallow";
import { ICryptoTableSkeletonProps } from "../../models";
import useFavoritesStore from "../../store/favorites.store";

const CryptoTableSkeleton: React.FC<ICryptoTableSkeletonProps> = ({
  rowsPerPage,
}) => {
  const { favorites, showFavorites } = useFavoritesStore(
    useShallow((state) => ({
      favorites: state.favorites,
      showFavorites: state.showFavorites,
    }))
  );

  let rows = Array.from({
    length: showFavorites ? favorites.length : rowsPerPage,
  });

  return (
    <div className="overflow-x-auto max-w-[1300px] m-auto">
      <table className="crypto-table min-w-[129px] shadow table-auto sm:rounded-lg">
        <thead>
          <tr>
            <th className="px-2 py-3 bg-primary-bg "></th>
            <th className="px-2 py-3 bg-primary-bg ">
              <div className="w-6 h-6 rounded-sm bg-skeleton-bg animate-pulse"></div>
            </th>
            <th
              className="w-full px-2 py-3 bg-primary-bg"
              style={{ minWidth: "200px" }}
            >
              <div className="h-6 rounded-sm bg-skeleton-bg w-14 animate-pulse"></div>
            </th>
            <th className="px-2 py-3 bg-primary-bg ">
              <div className="h-6 ml-auto rounded-sm bg-skeleton-bg w-14 animate-pulse"></div>
            </th>
            <th className="px-2 py-3 bg-primary-bg" style={{ width: "71px" }}>
              <div className="w-8 h-6 ml-auto rounded-sm bg-skeleton-bg animate-pulse"></div>
            </th>
            <th className="px-2 py-3 bg-primary-bg " style={{ width: "71px" }}>
              <div className="w-8 h-6 ml-auto rounded-sm bg-skeleton-bg animate-pulse"></div>
            </th>
            <th className="px-2 py-3 bg-primary-bg " style={{ width: "71px" }}>
              <div className="w-8 h-6 ml-auto rounded-sm bg-skeleton-bg animate-pulse"></div>
            </th>
            <th className="px-2 py-3 bg-primary-bg " style={{ width: "145px" }}>
              <div className="w-24 h-6 ml-auto rounded-sm bg-skeleton-bg animate-pulse"></div>
            </th>
            <th className="px-2 py-3 bg-primary-bg " style={{ width: "145px" }}>
              <div className="w-24 h-6 ml-auto rounded-sm bg-skeleton-bg animate-pulse"></div>
            </th>
            <th className="px-2 py-3 bg-primary-bg " style={{ width: "151px" }}>
              <div className="w-24 h-6 ml-auto rounded-sm bg-skeleton-bg animate-pulse"></div>
            </th>
          </tr>
        </thead>
        <tbody className="bg-primary-bg ">
          {rows.map((_, index) => (
            <tr key={index}>
              <td className="px-2 py-[17px]" style={{ width: "32px" }}>
                <div className="w-4 h-4 rounded-sm bg-skeleton-bg animate-pulse"></div>
              </td>
              <td className="px-2 py-[17px]" style={{ width: "50px" }}>
                <div className="w-6 h-6 rounded-sm bg-skeleton-bg animate-pulse"></div>
              </td>
              <td
                className="px-2 py-[17px] w-full"
                style={{ minWidth: "200px" }}
              >
                <div className="flex items-center">
                  <div className="w-6 h-6 mr-2 rounded-full bg-skeleton-bg animate-pulse"></div>
                  <div className="flex-1 h-6 bg-skeleton-bg   max-w-[280px] animate-pulse rounded-sm"></div>
                </div>
              </td>
              <td className="px-2 py-[17px]" style={{ width: "145px" }}>
                <div className="w-[129px] h-6 ml-auto bg-skeleton-bg   animate-pulse rounded-sm"></div>
              </td>
              <td className="px-2 py-[17px]" style={{ width: "71px" }}>
                <div className="h-6 rounded-sm bg-skeleton-bg w-14 animate-pulse"></div>
              </td>
              <td className="px-2 py-[17px]" style={{ width: "71px" }}>
                <div className="h-6 rounded-sm bg-skeleton-bg w-14 animate-pulse"></div>
              </td>
              <td className="px-2 py-[17px]" style={{ width: "71px" }}>
                <div className="h-6 rounded-sm bg-skeleton-bg w-14 animate-pulse"></div>
              </td>
              <td className="px-2 py-[17px]" style={{ width: "145px" }}>
                <div className="w-[129px] h-6 bg-skeleton-bg   animate-pulse rounded-sm"></div>
              </td>
              <td className="px-2 py-[17px]" style={{ width: "145px" }}>
                <div className="w-[129px] h-6 bg-skeleton-bg   animate-pulse rounded-sm"></div>
              </td>
              <td className="px-2 py-[17px]" style={{ width: "151px" }}>
                <div className="w-[135px] h-6 bg-skeleton-bg   animate-pulse rounded-sm"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTableSkeleton;
