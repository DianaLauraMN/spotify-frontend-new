import Global from "../Global/Global";
import User from "../entities/user/User";
import UserAdapter from "../entities/user/UserAdapter";
import { IApiUserControllerCalls } from "./interfaces/IApiUser";
import axios from "axios";

const urlBase = Global.urlBase;

class ApiUser implements IApiUserControllerCalls {
    async getUserData(): Promise<User> {
        try {
            const token = localStorage.access_token;
            const response = await axios.get(`${urlBase}/me`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const user: User = UserAdapter.adaptUser(response.data);
            return user;
        } catch (error) {
            throw error;
        }
    }
}

export default ApiUser;