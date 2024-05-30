import PointModel from './model/point-model';
import { RenderPosition, render } from './framework/render';
import OfferModel from './model/offer-model';
import FilterModel from './model/filter-model';
import FilterPresenter from './presenter/filter-presenter';
import TripPresenter from './presenter/trip-presenter';
import NewPointButtonView from './view/new-point-button-view';
import PointsApiService from './points-api-service';
import DestinationModel from './model/destination-model';

const AUTHORIZATION = 'Basic hs8JlpqSS93hf7A1';
const END_POINT = 'https://21.objects.htmlacademy.pro/big-trip';

const mainTripElement = document.querySelector('.trip-main');
const filterElement = mainTripElement.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');
const pointApiService = new PointsApiService(END_POINT, AUTHORIZATION);

const offerModel = new OfferModel(pointApiService);
const destinationModel = new DestinationModel(pointApiService);
const filterModel = new FilterModel();
const pointModel = new PointModel(pointApiService);

const tripPresentor = new TripPresenter({
  tripMainContainer: mainTripElement,
  eventsContainer: tripEvents,
  pointModel,
  destinationModel,
  offerModel,
  filterModel,
  onNewPointDestroy: handleNewPointFormClose
});
const filterPresenter = new FilterPresenter({
  filterContainer: filterElement,
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

filterPresenter.init();
tripPresentor.init();
offerModel.init().finally(() => {
  destinationModel.init().finally(() => {
    pointModel.init().finally(() => {
      render(newPointButtonComponent, mainTripElement, RenderPosition.BEFOREEND);
    });
  });
});
