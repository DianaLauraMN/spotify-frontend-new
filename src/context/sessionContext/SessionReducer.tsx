import { IAuthData } from "../../api/interfaces/IAuthData";
import { IStateSession } from "./SessionContext"

export enum SessionAction {
    LOAD_AUTH_DATA = 1,
    HANDLE_ON_SESSION = 2,
}

type sessionAction =
    | { type: SessionAction.LOAD_AUTH_DATA, payload: IAuthData }
    | { type: SessionAction.HANDLE_ON_SESSION, payload: boolean }

export const SessionReducer = (state: IStateSession, action: sessionAction): IStateSession => {
    switch (action.type) {

        case SessionAction.LOAD_AUTH_DATA:
            return {
                ...state,
                authData: action.payload,
            }

        case SessionAction.HANDLE_ON_SESSION:
            return {
                ...state,
                isSessionActive: action.payload
            }

        default:
            return state;
    }
}