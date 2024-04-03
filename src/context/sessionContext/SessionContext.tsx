import { createContext } from "react";
import { IAuthData } from "../../api/interfaces/IAuthData"

export interface IStateSession {
    authData: IAuthData,
    isSessionActive: boolean,
}
export type SessionContextProps = {
    sessionState: IStateSession,
    loadAuthData: () => void;
    handleOnSessionActive: (isSessionActive: boolean) => void;
}

export const SessionContext = createContext<SessionContextProps>({} as SessionContextProps);