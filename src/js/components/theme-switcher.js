import Component from './component.js';
import StorageService from '../services/storage.js';

const THEMES = ['light', 'dark', 'epileptic'];
const TOGGLE_POSITIONS = ['start', 'center', 'end'];

export default class ThemeSwitcher extends Component {
  constructor() {
    super();

    const theme = StorageService.getTheme() || THEMES[0];

    this._stateIndex = THEMES.indexOf(theme) || 0;
    this._toggle = null;
    this._titleElement = null;

    this.setTheme(THEMES[this.stateIndex]);
  }

  get stateIndex() {
    return this._stateIndex % (TOGGLE_POSITIONS.length);
  }

  changeTheme() {
    this._toggle.classList.remove(TOGGLE_POSITIONS[this.stateIndex]);
    document.body.classList.remove(THEMES[this.stateIndex]);

    this._stateIndex += 1;

    this._toggle.classList.add(TOGGLE_POSITIONS[this.stateIndex]);
    this.setTheme(THEMES[this.stateIndex]);

    StorageService.setTheme(THEMES[this.stateIndex]);
    this._titleElement.innerHTML = `${THEMES[this.stateIndex].charAt(0).toUpperCase() + THEMES[this.stateIndex].substring(1)} theme`;
  }

  setTheme(theme) {
    document.body.classList.add(theme);
  }

  render() {
    const container = document.createElement('div');
    container.classList.add('theme-switcher__container');

    const component = document.createElement('div');
    component.classList.add('theme-switcher');
    component.addEventListener('click', () => this.changeTheme());

    this._titleElement = document.createElement('p');
    this._titleElement.classList.add('theme-switcher__title');
    this._titleElement.innerHTML = `${THEMES[this.stateIndex].charAt(0).toUpperCase() + THEMES[this.stateIndex].substring(1)} theme`;

    this._toggle = document.createElement('div');
    this._toggle.classList.add('theme-switcher__toggle');
    this._toggle.classList.add(TOGGLE_POSITIONS[this.stateIndex]);

    component.insertAdjacentElement('beforeend', this._toggle);
    container.insertAdjacentElement('beforeend', component);
    
    container.insertAdjacentElement('beforeend', this._titleElement);
    return container;
  }
}
