import Component from "./component.js"

export default class Content extends Component {
    constructor(className, ...components) {
        super();
        this.children = components;
        this._className = className;
    }   

    render() {
        return this.createElement('div', this._className);
    }
}