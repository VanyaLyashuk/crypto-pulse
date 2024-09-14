export interface ICoinInfoStore {
  selectedCoinId: string;
  setSelectedCoinId: (id: string) => void;
}