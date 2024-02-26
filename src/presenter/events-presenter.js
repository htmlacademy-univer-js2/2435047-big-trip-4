import EventListView from '../view/event-list-view.js';
import SortView from '../view/sort-view.js';
import EventView from '../view/event-view.js';
import EventEditView from '../view/event-edit-view.js';
import NewPointView from '../view/new-point-view.js';
import { render } from '../render.js';

const EVENTS_COUNT = 3;

export default class EventsPresenter {
  eventsComponent = new EventListView();

  constructor({ eventsContainer }) {
    this.eventsContainer = eventsContainer;
  }

  init() {
    render(this.eventsComponent, this.eventsContainer);
    render(new SortView(), this.eventsContainer);
    render(new NewPointView, this.eventsComponent.getElement());
    render(new EventEditView(), this.eventsComponent.getElement());

    for (let i = 0; i < EVENTS_COUNT; i++) {
      render(new EventView(), this.eventsComponent.getElement());
    }
  }
}
