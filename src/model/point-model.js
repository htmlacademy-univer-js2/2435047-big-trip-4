import { UpdateType } from '../const';
import Observable from '../framework/observable';
import { adaptToClient } from '../utils/adapt-utils';
import { updateItem } from '../utils/common';
import { sortByDay } from '../utils/points-utils';

export default class PointModel extends Observable {
  #points = [];
  #pointApiService = null;

  constructor(pointApiService) {
    super();
    this.#pointApiService = pointApiService;
    this.#points = [];
  }

  get points() {
    return this.#points.sort(sortByDay);
  }

  async init() {
    try {
      const points = await this.#pointApiService.points;
      this.#points = points.map(adaptToClient);
    } catch(err) {
      this.#points = [];
    }

    this._notify(UpdateType.INIT);
  }

  async updatePoint(updateType, update) {
    try {
      const response = await this.#pointApiService.updatePoint(update);
      const updatePoint = adaptToClient(response);
      this.#points = updateItem(this.#points, updatePoint);
      this._notify(updateType, updatePoint);
    } catch(err) {
      throw new Error('Can\'t update task');
    }
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
