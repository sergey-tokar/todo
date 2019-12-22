import Component from "./component.js";
import Input from "./input.js";
import Button from './button.js';
import ListService from "../services/list.js";

export default class ListItem extends Component {
    constructor(model, className) {
        super(className);
        this._listService = new ListService();
        this._input = null;
        this._buttonDone = null;
        this._buttonRemove = null;
        this._model = model;
    }

    render() {
        this._input = new Input('list-item_value', value => {
            this._model.text = value;
        });
        this._input.setValue(this._model.text);
        this._input.onKeyPress(code => {
            if (code === 'Enter' || code === 'NumpadEnter') { 
                this._listService.update(this._model);
            }
        });

        this._buttonDone = new Button('\u{2714}', 'empty', () => {
            this._model.completed = !this._model.completed;
            this._listService.update(this._model)
        });

        this._buttonRemove = new Button('\u{2715}', 'empty', () => this._listService.removeListItem(this._model));

        this.children = [
            this._buttonDone,
            this._input,
            this._buttonRemove,
        ];

        return this.createElement('div', 'list-item');
    }
}    