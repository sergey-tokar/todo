import Component from "./component.js"
import Button from "./button.js";
import ListService from "../services/list.js";
import ListItem from './list-item.js';

export default class List extends Component {
    constructor() {
        super();
        this._listService = new ListService();

        this._filtersElement = null;
        this._listItemsElement = null;
        this._buttonFilterAll = null;
        this._buttonFilterInProgress = null;
        this._buttonFilterCompleted = null;

        this._items = [];

        this.getItems();
    }

    async getItems() {
        const items = await this._listService.getListItems();

        if (!items) {
            return;
        }

        this.items = items;
    }

    get items() {
        return this._items;
    }

    set items(items) {
        this._items = items;

        this._listItemsElement.children = items.map(item => {
            let listItem = new ListItem(item, 'list_list-item');

            if (item.completed) {
                listItem.addClassName('done');
            }

            return listItem;
        });

        this._buttonFilterAll.removeClassName('active');
        this._buttonFilterInProgress.removeClassName('active');
        this._buttonFilterCompleted.removeClassName('active');

        switch (this._listService.getFilterType()) {
            case 'All': this._buttonFilterAll.addClassName('active');
                break;
            case 'In progress': this._buttonFilterInProgress.addClassName('active');
                break;
            case 'Completed': this._buttonFilterCompleted.addClassName('active');
                break;
        }

        this.children = [this._filtersElement, this._listItemsElement];
    }

    render() {
        this._buttonFilterCompleted = new Button('Completed', 'link', () => this._listService.setFilterType('Completed'));
        this._buttonFilterInProgress = new Button('In progress', 'link', () => this._listService.setFilterType('In progress'));
        this._buttonFilterAll = new Button('All', 'link', () => this._listService.setFilterType('All'));
        this._buttonFilterAll.addClassName('active');

        this._filtersElement = new Component('list_filters');
        this._filtersElement.addClassName('list_filters');
        this._filtersElement.children = [
            this._buttonFilterAll,
            this._buttonFilterInProgress,
            this._buttonFilterCompleted,
        ];

        this._listItemsElement = new Component('list_items');

        this.children = [this._filtersElement, this._listItemsElement];

        this._listService.addListItemsListener(items => {
            this.items = items;
        });

        return this.createElement('div', 'list');
    }
}    