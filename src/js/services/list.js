import ApiService from './api.js';
import routes from '../api.js';
import NotificationsService from './notifications.js';

let instance = null;
export default class ListService {
    constructor() {
        if (instance) {
            return instance;
        }
        this._text = '';
        this._listItems = [];
        this._listItemsListeners = [];
        this._filterType = 'All';
        instance = this;
    }

    setFilterType(filter) {
        this._filterType = filter;
        this.publish();
    }

    getFilterType() {
        return this._filterType;
    }

    filterItems(array) {
        if (this._filterType === 'All') {
            return array;
        }
        if (this._filterType === 'Completed') {
            return array.filter(item => item.completed);
        } else {
            return array.filter(item => !item.completed);
        }
    }

    sortItems(array) {
        let doneListItems = [];
        let inProgressItems = [];
        array.forEach(item => {
            if (item.completed) {
                doneListItems.push(item);
            } else {
                inProgressItems.push(item);
            }
        });
        return [].concat(inProgressItems, doneListItems);
    }

    publish() {
        let sortItems = this.sortItems(this.filterItems(this._listItems));
        this._listItemsListeners.forEach((listener) => listener(sortItems));
    }

    async getListItems() {
        try {
            const items = await ApiService.get(routes.todos.read);
            this._listItems = items;
            let sortItems = this.sortItems(this.filterItems(this._listItems));
            return sortItems;
        } catch (error) {
            NotificationsService.showError(error);
            return false;
        }
    }

    async addListItem(text) {
        try {
            const listItem = await ApiService.post(routes.todos.create, { text, createDate: (+new Date()).toString() });
            this._listItems.unshift(listItem);
            this.publish();
            return true;
        } catch (error) {
            NotificationsService.showError(error);
            return false;
        }
    }

    async update(listItem) {
        try {
            const response = await ApiService.put(routes.todos.update(listItem._id), listItem);
            const item = this._listItems.find(item => item._id === response._id);
            const index = this._listItems.indexOf(item);
            this._listItems[index] = response;
            this.publish();
        } catch (error) {
            NotificationsService.showError(error);
            return false;
        }
    }

    async removeListItem(listItem) {
        try {
            await ApiService.delete(routes.todos.delete(listItem._id));
            this._listItems = this._listItems.filter(item => listItem !== item);
            this.publish();
            return true;
        } catch (error) {
            NotificationsService.showError(error);
            return false;
        }
    }

    addListItemsListener(listener) {
        this._listItemsListeners.push(listener);
    }
}