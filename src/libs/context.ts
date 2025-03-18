import { createContext } from "react";

export enum AppState {
  Prompt,
  Popup,
  Wait,
  Answer,
}

export interface Context {
  appState?: AppState;
  setAppState?: (state: AppState) => void;
}
export const StateContext = createContext<Context>({});
