import EventListView from '../view/event-list-view.js';
import SortView from '../view/sort-view.js';
import NoPointView from '../view/no-point-view.js';
import PointPresenter from './point-presenter.js';
import { remove, render } from '../framework/render.js';
import { RenderPosition } from '../framework/render.js';
import { SortType, UserAction, UpdateType, FilterType, TimeLimit } from '../const.js';
import { sortByOffers, sortByPrice, sortByTime } from '../utils/points-utils.js';
import { filter } from '../utils/filter.js';
import NewPointPresenter from './new-point-presenter.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import TripInfoView from '../view/trip-info-view.js';

export default class TripPresenter {
  #tripMainContainer = null;
  #eventsContainer = null;
  #pointModel = null;
  #destinationModel = null;
  #offerModel = null;
  #filterModel = null;
  #sortViewComponent = null;
  #noPointViewComponent = null;
  #tripInfoViewComponent = null;
  #isLoading = true;

  #pointPresenters = new Map();
  #newPointPresenter = null;
  #eventListViewComponent = new EventListView();

  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });


  constructor({ tripMainContainer, eventsContainer, pointModel, destinationModel, offerModel, filterModel, onNewPointDestroy }) {
    this.#tripMainContainer = tripMainContainer;
    this.#eventsContainer = eventsContainer;
    this.#pointModel = pointModel;
    this.#destinationModel = destinationModel;
    this.#offerModel = offerModel;
    this.#filterModel = filterModel;

    this.#newPointPresenter = new NewPointPresenter({
      pointListContainer: this.#eventListViewComponent,
      destinationModel: this.#destinationModel,
      offerModel: this.#offerModel,
      changeDataHandler: this.#handleViewAction,
      destroyHandler: onNewPointDestroy
    });

    this.#pointModel.addObserver(this.#handleModelPoint);
    this.#filterModel.addObserver(this.#handleModelPoint);
  }

  init() {
    this.#renderBoard();
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.TIME:
        return filteredPoints.sort(sortByTime);
      case SortType.PRICE:
        return filteredPoints.sort(sortByPrice);
      case SortType.OFFERS:
        return filteredPoints.sort(sortByOffers);
    }

    return filteredPoints;
  }

  createPoint() {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init();
  }

  #clearBoard({ resetSortType = false } = {}) {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortViewComponent);

    if (this.#noPointViewComponent) {
      remove(this.#noPointViewComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #renderTripInfoView() {
    if (this.#tripInfoViewComponent !== null) {
      remove(this.#tripInfoViewComponent);
    }

    this.#tripInfoViewComponent = new TripInfoView(this.#pointModel, this.#offerModel, this.#destinationModel);

    render(this.#tripInfoViewComponent, this.#tripMainContainer, RenderPosition.AFTERBEGIN);
  }

  #renderSortView() {
    if (this.#sortViewComponent !== null) {
      remove(this.#sortViewComponent);
    }

    this.#sortViewComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange,
      currentSortType: this.#currentSortType
    });

    render(this.#sortViewComponent, this.#eventListViewComponent.element, RenderPosition.BEFOREBEGIN);
  }

  #renderPointList() {
    render(this.#eventListViewComponent, this.#eventsContainer);
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      eventListViewComponentElement: this.#eventListViewComponent.element,
      destinationModel: this.#destinationModel,
      offerModel: this.#offerModel,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });

    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderPoints() {
    if (this.#noPointViewComponent !== null) {
      remove(this.#noPointViewComponent);
    }

    this.points.forEach((point) => this.#renderPoint(point));
  }

  #renderNoPointView() {
    this.#noPointViewComponent = new NoPointView(this.#isLoading);

    render(this.#noPointViewComponent, this.#eventsContainer, RenderPosition.AFTERBEGIN);
  }

  #renderBoard() {
    if (this.points.length === 0 || this.#isLoading) {
      this.#renderNoPointView();
      return;
    }

    this.#renderPointList();
    this.#renderPoints();
    this.#renderTripInfoView();

    this.#renderSortView();
  }

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenters.get(update.id).setSaving();
        try {
          await this.#pointModel.updatePoint(updateType, update);
        } catch(err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#newPointPresenter.setSaving();
        try {
          await this.#pointModel.addPoint(updateType, update);
        } catch(err) {
          this.#newPointPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenters.get(update.id).setDeleting();
        try {
          await this.#pointModel.deletePoint(updateType, update);
        } catch(err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
    }
    this.#uiBlocker.unblock();
  };

  #handleModelPoint = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({ resetSortType: true });
        this.#renderBoard();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        this.#renderBoard();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;

    this.#clearBoard({ resetRenderedTaskCount: true });
    this.#renderBoard();
  };
}
