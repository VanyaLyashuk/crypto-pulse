import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { IThemeStore, TTheme } from "../models";

const useThemeStore = create<IThemeStore>()(
  devtools(
    persist(
      (set) => ({
        theme: "light" as TTheme,
        toggleTheme: () =>
          set((state) => ({
            theme: state.theme === "light" ? "dark" : "light",
          })),
      }),
      {
        name: "theme",
      }
    ),
    { name: "ThemeStore" }
  )
);

export default useThemeStore;
