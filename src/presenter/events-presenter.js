import EventListView from '../view/event-list-view.js';
import SortView from '../view/sort-view.js';
import PointView from '../view/point-view.js';
import { render, replace } from '../framework/render.js';
import { POINT_COUNT } from '../const.js';
import PointEditView from '../view/point-edit-view.js';

export default class EventsPresenter {
  #eventsContainer = null;
  #pointModel = null;
  #points = null;

  #eventsComponent = new EventListView();

  constructor({ eventsContainer, pointModel }) {
    this.#eventsContainer = eventsContainer;
    this.#pointModel = pointModel;
  }

  init() {
    this.#points = [...this.#pointModel.getPoints()];

    render(new SortView(), this.#eventsContainer);
    render(this.#eventsComponent, this.#eventsContainer);

    for (let i = 0; i < POINT_COUNT; i++) {
      this.#renderPoint({ point: this.#points[i] });
    }

  }

  #renderPoint({ point }) {
    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceEditToEvent();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    const pointViewComponent = new PointView({
      point,
      onClick: () => {
        replaceEventToEdit();
        document.addEventListener('keydown', onEscKeyDown);
      }
    });

    const pointEditViewComponent = new PointEditView({
      point,
      onFormSubmit: () => {
        replaceEditToEvent();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    });

    function replaceEventToEdit() {
      replace(pointEditViewComponent, pointViewComponent);
    }

    function replaceEditToEvent() {
      replace(pointViewComponent, pointEditViewComponent);
    }

    render(pointViewComponent, this.#eventsComponent.element);
  }
}
