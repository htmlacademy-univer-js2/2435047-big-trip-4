import { EVENT_TYPES, DESTINATIONS } from '../const.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { getFullDate } from '../utils/points-utils.js';
import dayjs from 'dayjs';


function createPointOfferElement(offers, checkedOffers) {
  const offersElement = offers.map((offer) => `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="${offer.id}" type="checkbox" name="event-offer-${offer.title}" ${checkedOffers.includes(offer.id) ? 'checked' : ''}>
        <label class="event__offer-label" for="${offer.id}">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>`).join('');

  return `<div class="event__available-offers">${offersElement}</div>`;
}

function createImagesElement(destinationImages) {
  return destinationImages.map((img) => `<img class="event__photo" src="${img}.jpg" alt="Event photo">`).join('');
}


function createPointEditTemplate(point, destinations, pointOffers) {
  const { type, offers, dateFrom, dateTo, basePrice } = point;
  const currentOffers = pointOffers.find((offer) => offer.type === type);
  const currentDestination = destinations.find((destination) => destination.id === point.destination);
  return (
    `
    <li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
              ${EVENT_TYPES.map((eventType) => `<div class="event__type-item">
              <input id="event-type-${eventType.toLowerCase()}-1" class="event__${eventType.toLowerCase()}-input  visually-hidden" type="radio" name="event-type" value="${eventType}">
              <label class="event__type-label  event__type-label--${eventType.toLowerCase()}" for="event-type-${eventType.toLowerCase()}-1">${eventType}</label>
            </div>`).join('')};
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${currentDestination.name}" list="destination-list-1">
        <datalist id="destination-list-1">
          ${DESTINATIONS.map((city) => `<option value="${city}"></option>`).join('')}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${getFullDate(dateFrom)}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${getFullDate(dateTo)}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Cancel</button>
      <button class="event__rollup-btn" type="button">
              <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        ${createPointOfferElement(currentOffers.offers, offers)}

      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${currentDestination.description}</p>

        <div class="event__photos-container">
          <div class="event__photos-tape">
          ${createImagesElement(currentDestination.photo)}
          </div>
        </div>
      </section>
    </section>
  </form>
</li>
    `
  );
}

export default class PointEditView extends AbstractStatefulView {
  #handleFormSubmit = null;
  #handleRollUpClick = null;
  #destinations = null;
  #offers = null;

  constructor({ point, pointDestinations, pointOffers, onFormSubmit, onRollUpClick }) {
    super();
    this._state = PointEditView.parsePointToState(point);
    this.#offers = pointOffers;
    this.#destinations = pointDestinations;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleRollUpClick = onRollUpClick;

    this._setState(PointEditView.parsePointToState(point));
    this._restoreHandlers();
  }

  get template() {
    return createPointEditTemplate(this._state, this.#destinations, this.#offers);
  }

  reset(point) {
    this.updateElement(PointEditView.parsePointToState(point));
  }

  _restoreHandlers() {
    this.element.querySelector('.event__type-list')
      .addEventListener('change', this.#pointTypeChangeHandler);
    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#pointDestinationChangeHandler);
    this.element.querySelector('.event__input--price')
      .addEventListener('change', this.#pointPriceChangeHandler);
    this.element.querySelector('.event__input--time')
      .addEventListener('change', this.#pointTimeChangeHandler);
    this.element.querySelector('.event__available-offers')
      .addEventListener('change', this.#pointOfferChangeHandler);
    this.element.querySelector('.event--edit')
      .addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#rollUpButtonClick);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(PointEditView.parseStateToPoint(this._state));
  };

  #rollUpButtonClick = () => {
    this.#handleRollUpClick();
  };

  #pointTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
      offers: [],
    });
  };

  #pointDestinationChangeHandler = (evt) => {
    evt.preventDefault();
    const selectedDestination = this.#destinations.find((destination) => destination.name === evt.target.value);
    this.updateElement({
      destination: selectedDestination ? selectedDestination.id : null,
    });
  };

  #pointPriceChangeHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      ...this._state,
      basePrice: evt.target.value,
    });
  };

  #pointTimeChangeHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.name === 'event-start-time') {
      this.updateElement({
        dateFrom: dayjs(evt.target.value).toDate(),
      });
    } else {
      this.updateElement({
        dateTo: dayjs(evt.target.value).toDate(),
      });
    }
  };

  #pointOfferChangeHandler = (evt) => {
    evt.preventDefault();
    const checkedOffers = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'));
    this._setState({
      ...this._state,
      offers: checkedOffers.map((element) => element.id),
    });
  };

  static parsePointToState(point) {
    return {...point};
  }

  static parseStateToPoint(state) {
    return { ...state };
  }
}
