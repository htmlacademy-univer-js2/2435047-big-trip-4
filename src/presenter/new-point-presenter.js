import { remove, render, RenderPosition } from '../framework/render.js';
import { UserAction, UpdateType } from '../const.js';
import { isEscapeKey } from '../utils/common.js';
import PointEditView from '../view/point-edit-view.js';

export default class NewPointPresenter {
  #pointListContainer = null;
  #destinationModel = null;
  #offersModel = null;
  #handleDataChange = null;
  #handleDestroy = null;

  #pointEditViewComponent = null;

  constructor({ pointListContainer, destinationModel, offerModel, changeDataHandler, destroyHandler }) {
    this.#pointListContainer = pointListContainer;
    this.#destinationModel = destinationModel;
    this.#offersModel = offerModel;
    this.#handleDataChange = changeDataHandler;
    this.#handleDestroy = destroyHandler;
  }

  init() {
    if (this.#pointEditViewComponent !== null) {
      return;
    }

    this.#pointEditViewComponent = new PointEditView({
      pointDestinations: this.#destinationModel.destinations,
      pointOffers: this.#offersModel.offers,
      onFormSubmit: this.#handleEditSubmit,
      onEditDelete: this.#handleResetClick,
      isNewPoint: true
    });

    render(this.#pointEditViewComponent, this.#pointListContainer.element, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#pointEditViewComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#pointEditViewComponent);
    this.#pointEditViewComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  setSaving() {
    this.#pointEditViewComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#pointEditViewComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#pointEditViewComponent.shake(resetFormState);
  }

  #handleEditSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point,
    );
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
