import { POINT_COUNT } from '../const';
import { getRandomPoint } from '../mock/point';
import { getRandomArrayElement } from '../utils/common';
import CityModel from './city-model';
import OfferModel from './offer-model';
import { sortByDay } from '../utils/points-utils';

export default class PointModel {
  cityModel = new CityModel();
  cities = this.cityModel.getCities();

  points = Array.from({ length: POINT_COUNT }, () => {
    const offerModel = new OfferModel();
    const offersId = offerModel.getOffersIDs();

    const cityId = getRandomArrayElement(this.cities).id;

    const point = getRandomPoint(cityId, offersId);
    point.destination = this.cityModel.getCityById(cityId);
    point.offers = offerModel.getOffers();
    point.description = this.cityModel.getCityDescById(cityId);

    return point;
  });

  getPoints() {
    return this.points.sort(sortByDay);
  }

  getPoint() {
    return this.points[0];
  }
}
