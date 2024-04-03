import LocalStorageManager from "./LocalStorageManager";

const localStorageManager = new LocalStorageManager();

class AuthDate {
    isAuthDateValid = () => {
        const { login_date } = localStorageManager.getLocalStorageData();
        const { currentFormatDate } = this.getCurrentDate();
        return login_date ? currentFormatDate === login_date : false;
    }

    getCurrentDate = () => {
        const now = new Date();
        const day = now.getDate();
        const month = now.getMonth() + 1;
        const year = now.getFullYear();

        const formatDate: string = `${year}-${month}-${day}`;
        const currentTime = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
        return { currentFormatDate: formatDate, currentTime };
    }

    getTimeFormated = (timeInSec: number): string => {
        const hours = Math.floor(timeInSec / 3600);
        const minutes = Math.floor((timeInSec % 3600) / 60);
        const seconds = timeInSec % 60;
        return `${hours} horas, ${minutes} minutos y ${seconds} segundos.`
    }

}

export default AuthDate;