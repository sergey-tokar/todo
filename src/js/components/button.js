import Component from "./component.js"

export default class Button extends Component {
    constructor(text, className, onClickEvent) {
        super(className);
        this.children = text;
        this._onClickEvent = onClickEvent;
    }

    onClick(event) {
        this._onClickEvent = event;
    }

    render() {
        const button = this.createElement('button', 'button');
        button.addEventListener('click', () => this._onClickEvent())
        return button;
    }
}    