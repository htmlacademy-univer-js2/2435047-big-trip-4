import EventListView from '../view/event-list-view.js';
import SortView from '../view/sort-view.js';
import EventView from '../view/event-edit-view.js';
import NewPointView from '../view/new-point-view.js';
import { render } from '../render.js';
import { POINT_COUNT } from '../const.js';

export default class EventsPresenter {
  eventsComponent = new EventListView();

  constructor({ eventsContainer, pointModel }) {
    this.eventsContainer = eventsContainer;
    this.pointModel = pointModel;
  }

  init() {
    this.points = [...this.pointModel.getPoints()];
    this.currentPoint = this.pointModel.getPoint();

    render(this.eventsComponent, this.eventsContainer);
    render(new SortView(), this.eventsContainer);

    for (let i = 0; i < POINT_COUNT; i++) {
      render(new EventView({ data: this.points[i] }), this.eventsComponent.getElement());
    }

    render(new NewPointView({ point: this.currentPoint }), this.eventsComponent.getElement());
  }
}
