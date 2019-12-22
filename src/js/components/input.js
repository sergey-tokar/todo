import Component from "./component.js"

export default class Input extends Component {
    constructor(className, onChangeEvent = () => {}) {
        super(className);
        this._onChangeEvent = onChangeEvent;
        this._value = '';
        this._onKeyPressEvent = () => {};
        this._type = 'text';
        this._placeholder = '';
    }

    setValue(value) {
        this._value = value;
    }

    getValue() {
        return this._element.value;
    }

    clear() {
        this._element.value = '';
    }

    onChangeEvent(event) {
        this._onChangeEvent = event;
    }

    onKeyPress(event) {
        this._onKeyPressEvent = event;
    }

    setType(type) {
        this._type = type;
    }

    setPlaceholder(placeholder) {
        this._placeholder = placeholder;
    }

    render() {
        const input = this.createElement('input', 'input');
        input.value = this._value;
        input.setAttribute('type', this._type);
        input.setAttribute('placeholder', this._placeholder);
        input.addEventListener('change', (event) => this._onChangeEvent(event.target.value));
        input.addEventListener('keyup', (event) => this._onKeyPressEvent(event.code));
        return input;
    }
}