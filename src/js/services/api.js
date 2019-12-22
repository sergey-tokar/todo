import StorageService from "./storage.js";
import Spinner from "../components/spinner.js";

export default class ApiService {
    static async sendRequest({ method, url, data }) {
        const spinner = new Spinner().render();
        document.body.insertAdjacentElement('beforeend', spinner);

        const response = await fetch(url, {
            method,
            body: data ? JSON.stringify(data) : null,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': StorageService.getAccessToken()
            }
        });

        if (!response.ok) {
            spinner.remove();
            throw new Error(`${response.status} ${response.statusText}`);
        }

        spinner.remove();
        return response.json();
    }

    static async get(url) {
        return await ApiService.sendRequest({
            method: 'GET',
            url
        });
    }

    static async post(url, data) {
        return await ApiService.sendRequest({
            method: 'POST',
            data,
            url
        })
    }

    static async put(url, data) {
        return await ApiService.sendRequest({
            method: 'PUT',
            data,
            url
        });
    }

    static async delete(url) {
        return await ApiService.sendRequest({
            method: 'DELETE',
            url
        });
    }
}