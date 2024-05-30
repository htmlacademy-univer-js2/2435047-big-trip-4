import dayjs from 'dayjs';

function getDateDifference(dateFrom, dateTo) {
  const difference = dayjs(dateTo).diff(dayjs(dateFrom), 'm') + 1;

  if (difference / 1440 > 1) {
    return `${Math.floor(difference / 1440)} D ${Math.floor(difference % 1440 / 60)} H ${Math.floor(difference % 60)} M`;
  }

  if (difference / 60 > 1) {
    return `${Math.floor(difference / 60)} H ${Math.floor(difference % 60)} M`;
  }

  return `${Math.floor(difference)} M`;
}

function getTime(date) {
  return dayjs(date).format('hh:mm');
}

function getMonthAndDate(date) {
  return dayjs(date).format('MMM DD');
}

function getMonDayYearDate(date) {
  return dayjs(date).format('MMM DD YYYY');
}

function getFullDate(date) {
  return dayjs(date).format('DD/MM/YY hh:mm');
}

function isFuturedPoint(point) {
  return dayjs().isBefore(point.dateFrom);
}

function isPresentedPoint(point) {
  return dayjs().isAfter(point.dateFrom) && dayjs().isBefore(point.dateTo);
}

function isPastedPoint(point) {
  return dayjs().isAfter(point.dateTo);
}

function sortByTime(pointA, pointB) {
  const timeFrom = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));
  const timeTo = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));

  return timeFrom - timeTo;
}

function sortByPrice(pointA, pointB) {
  return pointB.basePrice - pointA.basePrice;
}

function sortByOffers(pointA, pointB) {
  return pointA.offers.length - pointB.offers.length;
}

function sortByDay(pointA, pointB) {
  const timeA = dayjs(pointA.dateFrom);
  const timeB = dayjs(pointB.dateFrom);

  return timeA - timeB;
}

function hasBigDifference(point1, point2) {
  return point1.price !== point2.price
    || getDateDifference(point1.dateFrom, point1.dateTo) !== getDateDifference(point2.dateFrom, point2.dateTo)
    || point1.destination !== point2.destination
    || point1.offers !== point2.offers;
}

export {
  getDateDifference,
  getFullDate,
  getMonthAndDate,
  getTime,
  isFuturedPoint,
  isPastedPoint,
  isPresentedPoint,
  sortByDay,
  sortByOffers,
  sortByPrice,
  sortByTime,
  hasBigDifference,
  getMonDayYearDate
};
