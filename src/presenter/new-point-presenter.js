import { remove, render, RenderPosition } from '../framework/render.js';
import { UserAction, UpdateType } from '../const.js';
import { isEscapeKey } from '../utils/common';
import PointEditView from '../view/point-edit-view.js';

export default class NewPointPresenter {
  #pointListContainer = null;
  #cityModel = null;
  #offersModel = null;
  #handleDataChange = null;
  #handleDestroy = null;

  #pointEditComponent = null;

  constructor({ pointListContainer, cityModel, offerModel, changeDataHandler, destroyHandler }) {
    this.#pointListContainer = pointListContainer;
    this.#cityModel = cityModel;
    this.#offersModel = offerModel;
    this.#handleDataChange = changeDataHandler;
    this.#handleDestroy = destroyHandler;
  }

  init() {
    if (this.#pointEditComponent !== null) {
      return;
    }

    this.#pointEditComponent = new PointEditView({
      pointDestinations: this.#cityModel.getCities(),
      pointOffers: this.#offersModel.getOffers(),
      onFormSubmit: this.#handleEditSubmit,
      onEditDelete: this.#handleResetClick,
      isNewPoint: true
    });

    render(this.#pointEditComponent, this.#pointListContainer.element, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#pointEditComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#pointEditComponent);
    this.#pointEditComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleEditSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      { id: crypto.randomUUID(), ...point },
    );
    this.destroy();
  };

  #handleResetClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.destroy();
    }
  };
}
