import EventListView from '../view/event-list-view.js';
import SortView from '../view/sort-view.js';
import NoPointView from '../view/no-point-view.js';
import PointPresenter from './point-presenter.js';
import { remove, render } from '../framework/render.js';
import { updateItem } from '../utils/common.js';
import { RenderPosition } from '../framework/render.js';
import { SortType } from '../const.js';
import { sortByOffers, sortByPrice, sortByTime } from '../utils/points-utils.js';

export default class EventsPresenter {
  #eventsContainer = null;
  #pointModel = null;
  #cityModel = null;
  #offerModel = null;
  #sortComponent = null;

  #points = [];
  #sourcedBoardPoints = [];

  #pointPresenters = new Map();
  #eventsComponent = new EventListView();

  #currentSortType = SortType.DAY;


  constructor({ eventsContainer, pointModel, cityModel, offerModel }) {
    this.#eventsContainer = eventsContainer;
    this.#pointModel = pointModel;
    this.#cityModel = cityModel;
    this.#offerModel = offerModel;
  }

  init() {
    this.#points = [...this.#pointModel.getPoints()];
    this.#sourcedBoardPoints = [...this.#pointModel.getPoints()];

    this.#renderBoard();
  }

  #renderBoard() {
    if (this.#points.length === 0) {
      this.#renderNoPointView();
      return;
    }

    this.#renderPoints();

    this.#renderSortView();
    this.#renderPointList();
  }

  #sortPoints(sortType) {

    switch (sortType) {
      case SortType.TIME:
        this.#points.sort(sortByTime);
        break;
      case SortType.PRICE:
        this.#points.sort(sortByPrice);
        break;
      case SortType.OFFERS:
        this.#points.sort(sortByOffers);
        break;
      default:
        this.#points = [...this.#sourcedBoardPoints];
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#renderSortView();
    this.#clearPointList();
    this.#renderPoints();
  };

  #renderSortView() {
    if (this.#sortComponent !== null) {
      remove(this.#sortComponent);
    }

    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange,
      currentSortType: this.#currentSortType
    });

    render(this.#sortComponent, this.#eventsComponent.element, RenderPosition.AFTERBEGIN);
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
      cityModel: this.#cityModel,
      offerModel: this.#offerModel,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange,
    });

    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderPoints() {
    for (let i = 0; i < this.#points.length; i++) {
      this.#renderPoint(this.#points[i]);
    }
  }

  #renderNoPointView() {
    render(new NoPointView(), this.#eventsContainer);
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#sourcedBoardPoints = updateItem(this.#sourcedBoardPoints, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };
}
