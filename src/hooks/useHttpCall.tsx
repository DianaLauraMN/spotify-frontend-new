import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import { useEffect } from "react";
import useSession from "./useSession";

const useHttpCall = () => {
    const { sessionState: { isSessionActive } } = useSession();

    const navigate = useNavigate();
    const { verifyUserSession } = useAuth();

    useEffect(() => {
        verifyUserSession();
    }, []);

    const checkAuthentication = async (callback: any, navigateToAfterCallback?: string) => {
        verifyUserSession();

        setTimeout(() => {
            if (isSessionActive) {
                callback;
                if (navigateToAfterCallback && isSessionActive) {
                    navigate(navigateToAfterCallback)
                }
            }
        }, 1000);

    };

    return { checkAuthentication };
}

export default useHttpCall;