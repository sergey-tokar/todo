import Component from "../components/component.js";

let instance = null;
export default class Router {
    constructor() {
        if (instance) {
            return instance;
        }

        this._host = '/src/#';
        this._routes = [];
        this._currentRoute = '/';
        this._appComponent = document.getElementById('app');

        window.addEventListener('popstate', event => {
            if (event.state && event.state.url) {
                this.navigate(event.state.url);
            }
        });

        instance = this;
    }

    navigate(route) {
        const component = this._routes.find(item => item.route === route);

        if (!component.checker()) {
            return false;
        }

        if (component && component.component instanceof Component) {
            this._appComponent.innerHTML = '';
            this._appComponent.insertAdjacentElement('beforeend', component.component.render());
        }
        
        history.pushState({ url: route }, '', this._host + route);
        this._currentRoute = route;
    }

    registerRoute({ route, component, checker = () => true }) {
        this._routes.push({ route, component, checker });
    }

    refresh() {
        const component = this._routes.find(item => item.route === this._currentRoute);
        if (component && component.component instanceof Component) {
            this._appComponent.innerHTML = '';
            this._appComponent.insertAdjacentElement('beforeend', component.component.render());
        }
    }
}