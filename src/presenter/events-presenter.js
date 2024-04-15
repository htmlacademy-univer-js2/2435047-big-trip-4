import EventListView from '../view/event-list-view.js';
import SortView from '../view/sort-view.js';
import NoPointView from '../view/no-point-view.js';
import PointPresenter from './point-presenter.js';
import { render } from '../framework/render.js';
import { POINT_COUNT } from '../const.js';
import { updateItem } from '../utils/common.js';

export default class EventsPresenter {
  #eventsContainer = null;
  #pointModel = null;
  #points = [];
  #pointPresenters = new Map();

  #sortComponent = new SortView();
  #eventsComponent = new EventListView();

  constructor({ eventsContainer, pointModel }) {
    this.#eventsContainer = eventsContainer;
    this.#pointModel = pointModel;
  }

  init() {
    this.#points = [...this.#pointModel.getPoints()];

    this.#renderBoard();
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #renderSortView() {
    render(this.#sortComponent, this.#eventsContainer);
  }

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderPointList() {
    render(this.#eventsComponent, this.#eventsContainer);
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      eventsComponentElement: this.#eventsComponent.element,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange
    });

    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderPoints() {
    for (let i = 0; i < POINT_COUNT; i++) {
      this.#renderPoint(this.#points[i]);
    }
  }

  #renderNoPointView() {
    render(new NoPointView(), this.#eventsComponent.element);
  }

  #renderBoard() {
    this.#renderPoints();

    if (this.#points.length === 0) {
      this.#renderNoPointView();
    }

    this.#renderSortView();
    this.#renderPointList();
  }
}
