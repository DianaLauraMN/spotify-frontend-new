import Global from "../Global/Global";
import axios from "axios";
import { IAuthData } from "./interfaces/IAuthData";
import AuthDate from "./AuthDate";
import LocalStorageManager from "./LocalStorageManager";

const authDate = new AuthDate();
const localStorageManager = new LocalStorageManager();

class ApiAuth {
    async getCredentials(spotyCode: string): Promise<void> {
        try {
            const searchParams = new URLSearchParams({
                code: spotyCode,
                grant_type: "authorization_code",
                redirect_uri: Global.redirect_uri,
                client_id: Global.client_id,
                client_secret: Global.client_secret,
            });

            const response = await axios.post("https://accounts.spotify.com/api/token", searchParams);
            if (response.status === 200) {
                console.log('GET CREDENTIALS 200 OK');

                const { access_token, expires_in, refresh_token } = response.data;
                if (access_token && expires_in && refresh_token) {
                    const currentDate = authDate.getCurrentDate();
                    const data: IAuthData = {
                        access_token,
                        refresh_token,
                        expires_in,
                        login_time: currentDate.currentTime.toString(),
                        login_date: currentDate.currentFormatDate,
                        spoty_code: spotyCode,
                        login_time_formated: authDate.getTimeFormated(currentDate.currentTime),
                    }
                    localStorageManager.saveDataInLocalStorage(data);
                }
            }
            if (response.status === 400 || response.status === 401) {
                console.log(response.status);
                this.getRefreshedToken();
            }


        } catch (error) {
            console.log(error);
        }
    }

    getRefreshedToken = async (): Promise<void> => {
        console.log('A REFRESCAR');

        const refreshToken: string | null = localStorage.getItem('refresh_token');
        if (!refreshToken) throw new Error('Sin refresh token');

        const params = new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
        });

        const authString = `${Global.client_id}:${Global.client_secret}`;
        const base64AuthString = btoa(authString);

        try {
            const response = await axios.post("https://accounts.spotify.com/api/token", params, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Basic ${base64AuthString}`
                }
            });


            if (response.status === 200) {
                console.log('REFRESCO EL TOKEEEEEEEEEEEEEEEEEEN');
                console.log('RETORNO UN 200!!!!!!!!!!!!!!!!!!!!!');

                const { access_token, expires_in } = response.data;
                if (access_token && expires_in) {
                    const currentDate = authDate.getCurrentDate();
                    const data: IAuthData = {
                        access_token,
                        refresh_token: null,
                        expires_in,
                        login_time: currentDate.currentTime.toString(),
                        login_date: currentDate.currentFormatDate,
                        spoty_code: null,
                        login_time_formated: authDate.getTimeFormated(currentDate.currentTime),
                    }
                    localStorageManager.saveDataInLocalStorage(data);
                } else {
                    console.log(response.data);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    isTokenValid = () => {
        const { access_token, login_date, login_time, expires_in } = localStorageManager.getLocalStorageData();

        if (access_token && expires_in && login_time && login_date) {
            const { currentTime } = authDate.getCurrentDate();
            const loginTimeInSec = parseInt(login_time, 10);
            const expiresInSec = parseInt(expires_in, 10);
            const expirationTimeInSec = loginTimeInSec + expiresInSec;

            return currentTime < expirationTimeInSec ? true : false;
        }
        return false;
    }

    doesRefreshTokenExist = () => {
        const { refresh_token } = localStorageManager.getLocalStorageData();
        return refresh_token ? true : false;
    }
}

export default ApiAuth;