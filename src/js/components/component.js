export default class Component {
    constructor(className = '') {
        this._classNames = [className];
        this._children = null;
        this._element = null;
    }
    
    addClassName(className) {
        this._classNames.push(className);
    }

    removeClassName(className) {
        this._classNames = this._classNames.filter(name => name !== className);
    }

    render() {
        return this.createElement('div', this._classNames[0]);
    }

    clear() {
        this.children = null;
    }

    createElement(name, className) {
        this._element = document.createElement(name);

        if (className) {
            this._classNames.push(className);
            this._classNames
            .filter(className => className)
            .forEach(className => this._element.classList.add(className));
        }
        
        if (!this._children) {
            return this._element;
        }

        if (Array.isArray(this._children)) {
            this._children.forEach(child => {
                if (child instanceof Component) {
                    this._element.insertAdjacentElement('beforeend', child.render());
                } else {
                    this._element.insertAdjacentHTML('beforeend', child);
                }
            });
        } else {
            if (this._children instanceof Component) {
                this._element.insertAdjacentElement('beforeend', this._children.render());
            } else {
                this._element.insertAdjacentHTML('beforeend', this._children);
            }
        }
        
        return this._element;
    }

    set children(value) {
        this._children = value;

        if (this._element) {
            this._element.innerHTML = '';
            
            if (!Array.isArray(value)) {
                value = [value];
            }

            value.forEach(item => this._element.insertAdjacentElement('beforeend', item.render()));
        }
    }
}
