import TripInfoView from './view/trip-info-view';
import FilterView from './view/filter-view';
import EventsPresenter from './presenter/events-presenter';
import PointModel from './model/point-model';
import { RenderPosition, render } from './framework/render';
import { generateFilters } from './mock/filter';

const mainTripElement = document.querySelector('.trip-main');
const filtersElement = mainTripElement.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');

const pointModel = new PointModel();
const eventsPresentor = new EventsPresenter({eventsContainer: tripEvents, pointModel});
const filters = generateFilters(pointModel.getPoints());

render(new TripInfoView(), mainTripElement, RenderPosition.AFTERBEGIN);
render(new FilterView({ filters: filters }), filtersElement);

eventsPresentor.init();
