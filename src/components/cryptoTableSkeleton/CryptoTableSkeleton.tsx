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

  const baseClasses = "rounded-sm bg-skeleton-bg animate-pulse";
  const divClasses = "h-6 " + baseClasses;
  const tableCellClasses = "px-2 py-[17px] bg-primary-bg";

  return (
    <div className="overflow-x-auto max-w-[1300px] m-auto">
      <table className="crypto-table min-w-[129px] shadow table-auto sm:rounded-lg">
        <thead>
          <tr>
            <th className={tableCellClasses}></th>
            <th className={tableCellClasses}>
              <div className={`w-6 ${divClasses}`}></div>
            </th>
            <th className={`w-full min-w-[200px] ${tableCellClasses}`}>
              <div className={`w-14 ${divClasses}`}></div>
            </th>
            <th className={tableCellClasses}>
              <div className={`ml-auto w-14 ${divClasses}`}></div>
            </th>
            <th className={`w-[71px] ${tableCellClasses}`}>
              <div className={`w-8 ml-auto ${divClasses}`}></div>
            </th>
            <th className={`w-[71px] ${tableCellClasses}`}>
              <div className={`w-8 ml-auto ${divClasses}`}></div>
            </th>
            <th className={`w-[71px] ${tableCellClasses}`}>
              <div className={`w-8 ml-auto ${divClasses}`}></div>
            </th>
            <th className={`w-[145px] ${tableCellClasses}`}>
              <div className={`w-24 ml-auto ${divClasses}`}></div>
            </th>
            <th className={`w-[145px] ${tableCellClasses}`}>
              <div className={`w-24 ml-auto ${divClasses}`}></div>
            </th>
            <th className={`w-[151px] ${tableCellClasses}`}>
              <div className={`w-24 ml-auto ${divClasses}`}></div>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((_, index) => (
            <tr key={index}>
              <td className={`w-[32px] ${tableCellClasses}`}>
                <div className={`w-4 h-4 ${baseClasses}`}></div>
              </td>
              <td className={`w-[50px] ${tableCellClasses}`}>
                <div className={`w-6 ${divClasses}`}></div>
              </td>
              <td className={`w-full min-w-[200px] ${tableCellClasses}`}>
                <div className="flex items-center">
                  <div className={`w-6 h-6 mr-2 ${baseClasses}`}></div>
                  <div className={`flex-1 max-w-[280px] ${divClasses}`}></div>
                </div>
              </td>
              <td className={`w-[145px] ${tableCellClasses}`}>
                <div className={`w-[129px] ml-auto ${divClasses}`}></div>
              </td>
              <td className={`w-[71px] ${tableCellClasses}`}>
                <div className={`w-14 ${divClasses}`}></div>
              </td>
              <td className={`w-[71px] ${tableCellClasses}`}>
                <div className={`w-14 ${divClasses}`}></div>
              </td>
              <td className={`w-[71px] ${tableCellClasses}`}>
                <div className={`w-14 ${divClasses}`}></div>
              </td>
              <td className={`w-[145px] ${tableCellClasses}`}>
                <div className={`w-[129px] ${divClasses}`}></div>
              </td>
              <td className={`w-[145px] ${tableCellClasses}`}>
                <div className={`w-[129px] ${divClasses}`}></div>
              </td>
              <td className={`w-[151px] ${tableCellClasses}`}>
                <div className={`w-[135px] ${divClasses}`}></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTableSkeleton;
