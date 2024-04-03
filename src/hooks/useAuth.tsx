import { useEffect } from 'react';
import ApiAuth from '../api/ApiAuth';
import AuthDate from '../api/AuthDate';
import LocalStorageManager from '../api/LocalStorageManager';
import { useNavigate } from 'react-router-dom';
import { notify } from '../components/utilitiesComponents/notifySessionExpired/NotifySessionExpired';
import useSession from './useSession';

const apiAuth = new ApiAuth();
const authDate = new AuthDate();
const localStorageManager = new LocalStorageManager();

const useAuth = () => {
    const navigate = useNavigate();
    const { sessionState: { isSessionActive }, handleOnSessionActive, loadAuthData } = useSession();

    const verifyUserSession = async () => {

        if (isSessionActive) {
            if (!authDate.isAuthDateValid()) {
                handleOnSessionActive(false);
                updateLocalStorage();
            }
        }

        if (authDate.isAuthDateValid()) {
            if (!apiAuth.isTokenValid() && apiAuth.doesRefreshTokenExist()) {
                await apiAuth.getRefreshedToken();
                handleOnSessionActive(true);

            } else if (apiAuth.isTokenValid()) {
                handleOnSessionActive(true);
            }
        }

        if (!isSessionActive && !authDate.isAuthDateValid()) {
            resetSessionData();
            console.log('AQUI');
        }
    };

    const updateLocalStorage = () => {
        resetSessionData();
        notify();

        setTimeout(() => {
            navigate('/');
        }, 2000);
    }

    const resetSessionData = () => {
        handleOnSessionActive(false);
        localStorageManager.resetLocalStorage();
        loadAuthData();
    }

    useEffect(() => {
        verifyUserSession();
    }, []);

    return { apiAuth, verifyUserSession, localStorageManager };
};

export default useAuth;