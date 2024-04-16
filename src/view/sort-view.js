import AbstractView from '../framework/view/abstract-view.js';
import { SortType } from '../const.js';

function createSortItems() {
  return Object.values(SortType).map((type) =>
    `<div class="trip-sort__item  trip-sort__item--${type}">
      <input id="sort-${type}" class="trip-sort__input  visually-hidden" data-sort-type="${type}" type="radio" name="trip-sort" value="sort-offer">
      <label class="trip-sort__btn" for="sort-${type}">${type}</label>
    </div>`
  ).join('');
}

function createSortTemplate() {
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
           ${createSortItems()}
      </form>`
  );
}

export default class SortView extends AbstractView {
  #handleSortTypeChange = null;

  constructor({ onSortTypeChange }) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate();
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    evt.preventDefault();
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
