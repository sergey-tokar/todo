import Component from "./component.js";
import Input from "./input.js";
import Button from "./button.js";
import ListService from "../services/list.js";

export default class InputGroup extends Component {
    constructor() {
        super();
        this._store = new ListService();
        const input = new Input('input-group_input');
        input.setPlaceholder('Add a new task');
        input.onKeyPress(async code => {
            if (code === 'Enter' || code === 'NumpadEnter') { 
                if (await this.addItem(input.getValue())) {
                    input.clear();
                }   
            }
        });

        const button = new Button('+', 'input-group_button', async () => {
            if (await this.addItem(input.getValue())) {
                input.clear();
            }  
        });

        this.children = [
            input,
            button,
        ];
    }

    async addItem(value) {
        if (!value) {
            return;
        }

        return await this._store.addListItem(value);
    }

    render() {
        return this.createElement('div', 'input-group');
    }
}    