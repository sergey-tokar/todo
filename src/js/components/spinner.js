import Component from "./component.js";

export default class Spinner extends Component {
    constructor() {
        super();
    }

    render() {
        const container = document.createElement('div');
        container.classList.add('spinner-container');

        const spinner = document.createElement('div');
        spinner.classList.add('spinner');

        container.insertAdjacentElement('beforeend', spinner);

        return container;
    }
}