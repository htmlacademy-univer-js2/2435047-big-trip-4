import TripInfoView from './view/trip-info-view';
import FilterView from './view/filter-view';
import EventsPresenter from './presenter/events-presenter';
import PointModel from './model/point-model';
import { RenderPosition, render } from './framework/render';
import { generateFilters } from './mock/filter';
import OfferModel from './model/offer-model';
import CityModel from './model/city-model';

const mainTripElement = document.querySelector('.trip-main');
const filtersElement = mainTripElement.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');

const offerModel = new OfferModel();
const cityModel = new CityModel();
const pointModel = new PointModel(offerModel, cityModel);
const eventsPresentor = new EventsPresenter({ eventsContainer: tripEvents, pointModel, cityModel, offerModel });
const filters = generateFilters(pointModel.getPoints());

render(new TripInfoView(), mainTripElement, RenderPosition.AFTERBEGIN);
render(new FilterView({ filters: filters }), filtersElement);

eventsPresentor.init();
