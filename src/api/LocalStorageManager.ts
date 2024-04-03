import { IAuthData } from "./interfaces/IAuthData";

class LocalStorageManager {
    setPreviousSpotyCode = (spoty_code: string) => {
        localStorage.setItem('spoty_code', spoty_code);
    }
    saveDataInLocalStorage = (auhtData: IAuthData) => {
        const { access_token, refresh_token, expires_in, login_date, login_time, spoty_code, login_time_formated } = auhtData;
        refresh_token ? localStorage.setItem('refresh_token', refresh_token) : localStorage.removeItem('refresh_token');
        spoty_code ? localStorage.setItem('spoty_code', spoty_code) : localStorage.removeItem('spoty_code');
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('expires_in', expires_in);
        localStorage.setItem('login_time', login_time);
        localStorage.setItem('login_date', login_date);
        localStorage.setItem('login_time_formated', login_time_formated);
    }

    resetLocalStorage = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('expires_in');
        localStorage.removeItem('login_time');
        localStorage.removeItem('login_date');
        localStorage.removeItem('spoty_code');
        localStorage.removeItem('login_time_formated');
    }

    getLocalStorageData = () => {
        const access_token = localStorage.getItem('access_token');
        const refresh_token = localStorage.getItem('refresh_token');
        const expires_in = localStorage.getItem('expires_in');
        const login_time = localStorage.getItem('login_time');
        const login_date = localStorage.getItem('login_date');
        const spoty_code = localStorage.getItem('spoty_code');
        const login_time_formated = localStorage.getItem('login_time_formated');

        const localStorageData: IAuthData = {
            access_token: access_token ?? "",
            refresh_token: refresh_token ?? "",
            expires_in: expires_in ?? "",
            login_time: login_time ?? "",
            login_date: login_date ?? "",
            spoty_code: spoty_code ?? "",
            login_time_formated: login_time_formated ?? "",
        }
        return localStorageData;
    }
}

export default LocalStorageManager;