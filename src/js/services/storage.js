const ACCESS_TOKEN_KEY = 'accessToken';
const THEME_KEY = 'theme';

export default class StorageService {
    static getAccessToken() {
        return localStorage.getItem(ACCESS_TOKEN_KEY);
    }

    static setAccessToken(token) {
        localStorage.setItem(ACCESS_TOKEN_KEY, token);
    }

    static removeAccessToken() {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
    }

    static setTheme(theme) {
        localStorage.setItem(THEME_KEY, theme);
    }

    static getTheme() {
        return localStorage.getItem(THEME_KEY);
    }
}