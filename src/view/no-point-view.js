import { NoTasksTextType } from '../const';
import AbstractView from '../framework/view/abstract-view';


function createNoPointViewTemplate(filterType) {
  const noTaskTextValue = NoTasksTextType[filterType];

  return `<p class="trip-events__msg">${noTaskTextValue}</p>`;
}

export default class NoPointView extends AbstractView {
  #filterType = null;

  constructor({ filterType }) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoPointViewTemplate(this.#filterType);
  }
}
