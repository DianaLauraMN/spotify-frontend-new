import { useReducer } from "react";
import { IStateSession, SessionContext } from "./SessionContext";
import { SessionAction, SessionReducer } from "./SessionReducer";
import LocalStorageManager from "../../api/LocalStorageManager";

interface props {
    children: JSX.Element | JSX.Element[];
}

const initial_state: IStateSession = {
    authData: {
        access_token: '', refresh_token: null, expires_in: '', login_time: '', login_date: '', spoty_code: null, login_time_formated: ''
    },
    isSessionActive: false,
}

const SessionProvider = ({ children }: props) => {
    const [session_state, dispatch] = useReducer(SessionReducer, initial_state);

    const loadAuthData = () => {
        const localStorageManager = new LocalStorageManager();
        dispatch({ type: SessionAction.LOAD_AUTH_DATA, payload: localStorageManager.getLocalStorageData() })
    }

    const handleOnSessionActive = (isSessionActive: boolean) => {
        dispatch({ type: SessionAction.HANDLE_ON_SESSION, payload: isSessionActive })
    }

    return (
        <SessionContext.Provider value={{
            sessionState: session_state,
            loadAuthData,
            handleOnSessionActive
        }}>
            {children}
        </SessionContext.Provider>
    )
}

export default SessionProvider;
