import routes from "../api.js";
import ApiService from "./api.js";
import StorageService from "./storage.js";
import NotificationsService from "./notifications.js";
import Spinner from "../components/spinner.js";

export default class AuthService {
    static async login(email, password) {
        try {
            const response = await ApiService.post(routes.auth.login, { email, password });
            StorageService.setAccessToken(response.token);

            return true;
        } catch (error) {
            NotificationsService.showError(error);
            return false;
        }
    }

    static async logOut() {
        StorageService.removeAccessToken();
    }
}