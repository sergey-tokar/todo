import Input from "./input.js";
import Button from "./button.js";
import AuthService from "../services/auth.js";
import Component from "./component.js";
import Router from "../services/router.js";

export default class Login extends Component {
    constructor() {
        super();
        this._email = '';
        this._password = '';
        this._router = new Router();
    }

    render() {
        const container = document.createElement('div');
        container.classList.add('login-container');

        const form = document.createElement('div');
        form.classList.add('login-form');

        const heading = document.createElement('p');
        heading.classList.add('login-heading');
        heading.innerHTML = 'Please, log in';

        const email = new Input('login-input-field', data => this._email = data);
        email.setPlaceholder('Email');
        email.setValue(this._email);

        const password = new Input('login-input-field', data => this._password = data);
        password.setType('password');
        password.setPlaceholder('Password');
        password.setValue(this._password);

        const submit = new Button('login', 'login-button', async () => {
            const success = await AuthService.login(
                this._email,
                this._password
            );

            if (success) {
                this._router.navigate('/todos');
            }
        });

        form.insertAdjacentElement('beforeend', heading);
        form.insertAdjacentElement('beforeend', email.render());
        form.insertAdjacentElement('beforeend', password.render());
        form.insertAdjacentElement('beforeend', submit.render());

        container.insertAdjacentElement('beforeend', form);

        return container;
    }
}