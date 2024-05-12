import { EVENT_TYPES, POINT_COUNT } from '../const';
import { getRandomPoint } from '../mock/point';
import { getRandomArrayElement, getRandomInteger } from '../utils/common';
import { sortByDay } from '../utils/points-utils';

export default class PointModel {
  points = [];
  #offerModel = null;
  #cityModel = null;

  constructor(offerM, cityM) {
    this.#offerModel = offerM;
    this.#cityModel = cityM;

    this.points = Array.from({ length: POINT_COUNT }, () => {
      const type = getRandomArrayElement(EVENT_TYPES);

      const cities = this.#cityModel.getCities();
      const destinationId = getRandomArrayElement(cities).id;
      const offers = this.#offerModel.getOffersByType(type);
      const offersIds = [];
      offers.forEach((offer) => {
        if (getRandomInteger(0, 2)) {
          offersIds.push(offer.id);
        }
      });

      const point = getRandomPoint(type, destinationId, offersIds);

      return point;
    });
  }

  getPoints() {
    return this.points.sort(sortByDay);
  }
}
