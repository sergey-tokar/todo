import Component from "../components/component.js";
import List from '../components/list.js';
import InputGroup from '../components/input-group.js';
import ThemeSwitcher from '../components/theme-switcher.js';
import Content from '../components/content.js';
import Button from "../components/button.js";
import AuthService from "../services/auth.js";
import Router from "../services/router.js";
import Counter from "../components/counter.js";

export default class TodosPage extends Component {
    constructor() {
        super();
        this._router = new Router();
    }

    render() {
        const inputGroup = new InputGroup();
        const list = new List();

        const themeSwitcher = new ThemeSwitcher();
        const counter = new Counter();
        const logOutButton = new Button('Log out', 'logout-button', () => {
            AuthService.logOut();
            this._router.navigate('/');
        });
        
        const panel = new Content('panel', themeSwitcher, counter, logOutButton);
        return new Content('content', panel, inputGroup, list).render();
    }
}