import { ICryptoTableRowsPerPageProps } from "./componentProps/CryptoTableRowsPerPageProps.interface";
import { ICryptoTableSkeletonProps } from "./componentProps/CryptoTableSkeletonProps.interface";
import { ICryptoTableViewProps } from "./componentProps/CryptoTableViewProps.interface";
import { IErrorBoundaryProps } from "./componentProps/ErrorBoundaryProps.interface";
import { IErrorMessageProps } from "./componentProps/ErrorMessageProps.interface";
import { ISparklineChartProps } from "./componentProps/SparklineChartProps.interface";
import { ICoinsListData } from "./dataTypes/CoinsListData.interface";
import { ICoinsMarketData } from "./dataTypes/CoinsMarketData.interface";
import { TCryptoTableCellContext } from "./dataTypes/CryptoTableCellContext.type";
import { TCryptoTableCurrency } from "./dataTypes/CryptoTableCurrency.type";
import { ITransformedCoinsMarketData } from "./dataTypes/TransformedCoinsMarketData.interface";
import { ITransformedPriceChange } from "./dataTypes/TransformedPriceChange.interface";
import { IPaginationProps } from "./pagination/Pagination.interface";
import { IPaginationComponentProps } from "./pagination/PaginationComponentProps.interface";
import { IErrorBoundaryState } from "./stateAndErrors/ErrorBoundaryState.interface";

export type {
    ICoinsListData,
    ICoinsMarketData,
    ICryptoTableRowsPerPageProps,
    ICryptoTableSkeletonProps,
    ICryptoTableViewProps,
    IErrorBoundaryProps,
    IErrorBoundaryState,
    IErrorMessageProps,
    IPaginationComponentProps,
    IPaginationProps,
    ISparklineChartProps,
    ITransformedCoinsMarketData,
    ITransformedPriceChange,
    TCryptoTableCellContext,
    TCryptoTableCurrency
};

