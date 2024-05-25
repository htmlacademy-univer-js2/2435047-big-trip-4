import { EVENT_TYPES, POINT_COUNT } from '../const';
import Observable from '../framework/observable';
import { getRandomPoint } from '../mock/point';
import { getRandomArrayElement, getRandomInteger, updateItem } from '../utils/common';
import { sortByDay } from '../utils/points-utils';

export default class PointModel extends Observable {
  #points = [];
  #offerModel = null;
  #cityModel = null;

  constructor({ offerModel, cityModel }) {
    super();
    this.#offerModel = offerModel;
    this.#cityModel = cityModel;

    this.#points = Array.from({ length: POINT_COUNT }, () => {
      const type = getRandomArrayElement(EVENT_TYPES);

      const cities = this.#cityModel.getCities();
      const destinationId = getRandomArrayElement(cities).id;
      const offers = this.#offerModel.getOfferByType(type).offers;
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

  get points() {
    return this.#points.sort(sortByDay);
  }

  updatePoint(updateType, update) {
    this.#points = updateItem(this.#points, update);
    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this.#points.push(update);
    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    this.#points = this.#points.filter((point) => point.id !== update.id);
    this._notify(updateType);
  }
}
