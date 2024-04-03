import User from "../../entities/user/User";

export interface IApiUserControllerCalls {
    getUserData(): Promise<User>;
}