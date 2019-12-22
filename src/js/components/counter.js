import Component from "./component.js";
import ListService from '../services/list.js';

export default class Counter extends Component {
    constructor() {
        super();
        this._listService = new ListService();
        this._element = null;
        
        this._listService.addListItemsListener(items => {
            this.setText(items);
        });

        this.getItems();
    }

    async getItems() {
        const items = await this._listService.getListItems();
        this.setText(items);
    }

    setText(items) {
        if (!items || !items.length) {
            this._element.innerText = 'There\'s no tasks :(';
            return;
        }

        let completedAmount = 0;
        items.forEach(item => {
            if (item.completed) {
                completedAmount += 1;
            }
        });

        if (completedAmount === items.length) {
            this._element.innerText = 'All the tasks comleted! You are wonderful :)';
            return;
        }

        this._element.innerText = `${completedAmount} of ${items.length} tasks completed `;
    }

    render() {
        this._element = document.createElement('div');
        this._element.classList.add('counter');

        return this._element;
    }
}