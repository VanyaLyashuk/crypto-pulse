import { TTheme } from "../dataTypes/Theme.type";

export interface IThemeStore {
  theme: TTheme;
  toggleTheme: () => void;
}