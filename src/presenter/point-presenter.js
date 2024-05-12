import PointView from '../view/point-view.js';
import PointEditView from '../view/point-edit-view.js';
import { render, replace, remove } from '../framework/render.js';
import { Mode } from '../const.js';

export default class PointPresenter {
  #pointViewComponent = null;
  #pointEditViewComponent = null;
  #handleDataChange = null;
  #handleModeChange = null;

  #eventsComponentElement = null;

  #point = null;
  #cityModel = null;
  #offerModel = null;

  #mode = Mode.DEFAULT;


  constructor({eventsComponentElement, cityModel, offerModel, onDataChange, onModeChange}) {
    this.#eventsComponentElement = eventsComponentElement;
    this.#cityModel = cityModel;
    this.#offerModel = offerModel;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(point) {
    this.#point = point;

    const prevPointViewComponent = this.#pointViewComponent;
    const prevPointEditViewComponent = this.#pointEditViewComponent;

    this.#pointViewComponent = new PointView({
      point: this.#point,
      pointDestination: this.#cityModel.getCityById(point.destination),
      pointOffers: this.#offerModel.getOffersByType(point.type),
      onClick: this.#handleOnClick,
      onFavoriteClick: this.#handleFavoriteClick
    });

    this.#pointEditViewComponent = new PointEditView({
      point: this.#point,
      pointDestinations: this.#cityModel.getCities(),
      pointOffers: this.#offerModel.getOffers(),
      onFormSubmit: this.#handleOnFormSubmit,
      onRollUpClick: this.#handleOnRollUpClick,
    });

    if (prevPointViewComponent === null || prevPointEditViewComponent === null) {
      render(this.#pointViewComponent, this.#eventsComponentElement);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointViewComponent, prevPointViewComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointEditViewComponent, prevPointEditViewComponent);
    }

    remove(prevPointViewComponent);
    remove(prevPointEditViewComponent);
  }

  destroy() {
    remove(this.#pointViewComponent);
    remove(this.#pointEditViewComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceEditToEvent();
    }
  }

  #replaceEventToEdit() {
    replace(this.#pointEditViewComponent, this.#pointViewComponent);
    document.addEventListener('keydown', this.#onEscKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceEditToEvent() {
    replace(this.#pointViewComponent, this.#pointEditViewComponent);
    document.removeEventListener('keydown', this.#onEscKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #onEscKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceEditToEvent();
    }
  };

  #handleOnClick = () => {
    this.#replaceEventToEdit();
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange({...this.#point, isFavorite: !this.#point.isFavorite});
  };

  #handleOnFormSubmit = (point) => {
    this.#replaceEditToEvent();
    this.#handleDataChange(point);
  };

  #handleOnRollUpClick = () => {
    this.#replaceEditToEvent();
  };
}
