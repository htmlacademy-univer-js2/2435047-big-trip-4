import PointModel from './model/point-model';
import { RenderPosition, render } from './framework/render';
import OfferModel from './model/offer-model';
import CityModel from './model/city-model';
import FilterModel from './model/filter-model';
import FilterPresenter from './presenter/filter-presenter';
import TripPresenter from './presenter/trip-presenter';
import NewPointButtonView from './view/new-point-button-view';

const mainTripElement = document.querySelector('.trip-main');
const filtersElement = mainTripElement.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');

const offerModel = new OfferModel();
const cityModel = new CityModel();
const filterModel = new FilterModel();
const pointModel = new PointModel({
  offerModel,
  cityModel
});

const tripPresentor = new TripPresenter({
  eventsContainer: tripEvents,
  pointModel,
  cityModel,
  offerModel,
  filterModel,
  onNewPointDestroy: handleNewPointFormClose
});
const filterPresenter = new FilterPresenter({
  filterContainer: filtersElement,
  filterModel,
  pointModel
});

const newPointButtonComponent = new NewPointButtonView({
  onClick: handleNewPointButtonClick,
});

function handleNewPointFormClose() {
  newPointButtonComponent.element.disabled = false;
}

function handleNewPointButtonClick() {
  tripPresentor.createPoint();
  newPointButtonComponent.element.disabled = true;
}

render(newPointButtonComponent, mainTripElement, RenderPosition.AFTEREND);

filterPresenter.init();
tripPresentor.init();
