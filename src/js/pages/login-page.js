import Component from "../components/component.js";
import ThemeSwitcher from '../components/theme-switcher.js';
import Login from '../components/login.js';
import Content from '../components/content.js';

export default class LoginPage extends Component {
    constructor() {
        super();
    }

    render() {
        const themeSwitcher = new ThemeSwitcher();
        const login = new Login();

        return new Content('content', themeSwitcher, login).render();
    }
}