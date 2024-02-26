import TripInfoView from './view/trip-info-view';
import FilterView from './view/filter-view';
import EventsPresenter from './presenter/events-presenter';
import { RenderPosition, render } from './render';

const mainTripElement = document.querySelector('.trip-main');
const filtersElement = mainTripElement.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');

const eventsPresentor = new EventsPresenter({eventsContainer: tripEvents});


render(new TripInfoView(), mainTripElement, RenderPosition.AFTERBEGIN);
render(new FilterView(), filtersElement);

eventsPresentor.init();
