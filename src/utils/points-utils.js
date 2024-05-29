import dayjs from 'dayjs';

function getDateDiff(dateFrom, dateTo) {
  const diff = dayjs(dateTo).diff(dayjs(dateFrom), 'm');

  if (Math.ceil(diff / 1440) > 1) {
    return `${Math.ceil(diff / 1440)} D`;
  }

  if (Math.ceil(diff / 60) > 1) {
    return `${Math.ceil(diff / 60)} H`;
  }
  return `${Math.ceil(diff)} M`;
}

function getTime(dt) {
  return dayjs(dt).format('hh:mm');
}

function getMonthAndDate(dt) {
  return dayjs(dt).format('MMM DD');
}

function getMonDayYearDate(dt) {
  return dayjs(dt).format('MMM DD YYYY');
}

function getFullDate(dt) {
  return dayjs(dt).format('DD/MM/YY hh:mm');
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
  const timeFrom = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
  const timeTo = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));

  return timeFrom - timeTo;
}

function sortByPrice(pointA, pointB) {
  return pointA.basePrice - pointB.basePrice;
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
    || getDateDiff(point1.dateFrom, point1.dateTo) !== getDateDiff(point2.dateFrom, point2.dateTo)
    || point1.destination !== point2.destination
    || point1.offers !== point2.offers;
}

export {
  getDateDiff,
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
