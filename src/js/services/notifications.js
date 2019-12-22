export default class NotificationsService {
    static showAlert({ title, message }) {
        console.log({ title, message });
    }

    static showError(error) {
        console.error(`${error}`);
    }
}