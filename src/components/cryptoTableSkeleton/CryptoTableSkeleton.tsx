import React from "react";
import { ICryptoTableSkeletonProps } from "../../models";

const CryptoTableSkeleton: React.FC<ICryptoTableSkeletonProps> = ({
  rowsPerPage,
}) => {
  const rows = Array.from({ length: rowsPerPage });

  return (
    <div className="overflow-x-auto max-w-[1300px] m-auto">
      <table className="min-w-[129px] shadow table-auto sm:rounded-lg">
        <thead>
          <tr>
            <th className="px-2 py-3.5 bg-white"></th>
            <th className="px-2 py-3.5 bg-white">
              <div className="w-6 h-6 bg-gray-200 animate-pulse"></div>
            </th>
            <th
              className="px-2 py-3.5 bg-white w-full"
              style={{ minWidth: "200px" }}
            >
              <div className="h-6 bg-gray-200 w-14 animate-pulse"></div>
            </th>
            <th className="px-2 py-3.5 bg-white">
              <div className="h-6 ml-auto bg-gray-200 w-14 animate-pulse"></div>
            </th>
            <th className="px-2 py-3.5 bg-white" style={{ width: "71px" }}>
              <div className="w-8 h-6 ml-auto bg-gray-200 animate-pulse"></div>
            </th>
            <th className="px-2 py-3.5 bg-white" style={{ width: "71px" }}>
              <div className="w-8 h-6 ml-auto bg-gray-200 animate-pulse"></div>
            </th>
            <th className="px-2 py-3.5 bg-white" style={{ width: "71px" }}>
              <div className="w-8 h-6 ml-auto bg-gray-200 animate-pulse"></div>
            </th>
            <th className="px-2 py-3.5 bg-white" style={{ width: "145px" }}>
              <div className="w-24 h-6 ml-auto bg-gray-200 animate-pulse"></div>
            </th>
            <th className="px-2 py-3.5 bg-white" style={{ width: "145px" }}>
              <div className="w-24 h-6 ml-auto bg-gray-200 animate-pulse"></div>
            </th>
            <th className="px-2 py-3.5 bg-white" style={{ width: "151px" }}>
              <div className="w-24 h-6 ml-auto bg-gray-200 animate-pulse"></div>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {rows.map((_, index) => (
            <tr key={index}>
              <td className="px-2 py-[21px]" style={{ width: "32px" }}>
                <div className="w-4 h-4 bg-gray-200 animate-pulse"></div>
              </td>
              <td className="px-2 py-[21px]" style={{ width: "50px" }}>
                <div className="w-6 h-6 bg-gray-200 animate-pulse"></div>
              </td>
              <td
                className="px-2 py-[21px] w-full"
                style={{ minWidth: "200px" }}
              >
                <div className="flex items-center">
                  <div className="w-6 h-6 mr-2 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="flex-1 h-6 bg-gray-200 max-w-[280px] animate-pulse"></div>
                </div>
              </td>
              <td className="px-2 py-[21px]" style={{ width: "145px" }}>
                <div className="w-[129px] h-6 ml-auto bg-gray-200 animate-pulse"></div>
              </td>
              <td className="px-2 py-[21px]" style={{ width: "71px" }}>
                <div className="h-6 bg-gray-200 w-14 animate-pulse"></div>
              </td>
              <td className="px-2 py-[21px]" style={{ width: "71px" }}>
                <div className="h-6 bg-gray-200 w-14 animate-pulse"></div>
              </td>
              <td className="px-2 py-[21px]" style={{ width: "71px" }}>
                <div className="h-6 bg-gray-200 w-14 animate-pulse"></div>
              </td>
              <td className="px-2 py-[21px]" style={{ width: "145px" }}>
                <div className="w-[129px] h-6 bg-gray-200 animate-pulse"></div>
              </td>
              <td className="px-2 py-[21px]" style={{ width: "145px" }}>
                <div className="w-[129px] h-6 bg-gray-200 animate-pulse"></div>
              </td>
              <td className="px-2 py-[21px]" style={{ width: "151px" }}>
                <div className="w-[135px] h-6 bg-gray-200 animate-pulse"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTableSkeleton;
