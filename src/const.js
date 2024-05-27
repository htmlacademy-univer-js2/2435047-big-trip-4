import dayjs from 'dayjs';

const DEFAULT_TYPE = 'taxi';

const EVENT_TYPES = [
  'Taxi',
  'Bus',
  'Train',
  'Ship',
  'Drive',
  'Flight',
  'Check-in',
  'Sightseeing',
  'Restaurant'
];

const EMPTY_POINT = {
  type: DEFAULT_TYPE,
  basePrice: 0,
  dateFrom: dayjs().toDate(),
  dateTo: dayjs().toDate(),
  destination: null,
  isFavorite: false,
  offers: []
};

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  DELETE: 'DELETE',
  POST: 'POST',
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers'
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT'
};

const ButtonText = {
  CANCEL: 'Cancel',
  DELETE: 'Delete',
  DELETING: 'Deleting',
  SAVE: 'Save',
  SAVING: 'Saving',
};

const NoPointsTextType = {
  NOPOINTS: 'Click New Event to create your first point',
  LOADING: 'Loading...',

};

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000
};

export {
  EVENT_TYPES,
  FilterType,
  Mode,
  SortType,
  UserAction,
  UpdateType,
  NoPointsTextType,
  ButtonText,
  EMPTY_POINT,
  Method,
  TimeLimit
};
