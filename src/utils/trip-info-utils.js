import dayjs from 'dayjs';
import { getMonDayYearDate } from './points-utils';

function getPointsDataRange(points) {
  const startDate = getMonDayYearDate(points[0].dateFrom);
  const pointWithEndDate = points.reduce((maxDatePoint, currentPoint) =>
    (dayjs(maxDatePoint.dateTo) < dayjs(currentPoint.dateTo)) ? currentPoint : maxDatePoint);
  const endDate = getMonDayYearDate(pointWithEndDate.dateTo);

  return { startDate, endDate };
}

function getTripRoute(points, destinationModel) {
  const destinations = [];

  points.forEach((point) => {
    destinations.push(destinationModel.getDestinationById(point.destination).name);
  });

  return destinations;
}

function getTripPrice(points, offerModel) {
  let result = 0;

  points.forEach((point) => {
    result += point.basePrice;
    result += getPointOffersPrice(point, offerModel);
  });

  return result;
}

function getPointOffersPrice(point, offerModel) {
  let result = 0;
  const pointOffers = offerModel.getOffersByType(point.type).offers;

  pointOffers.forEach((offer) => {
    if (point.offers.includes(offer.id)) {
      result += offer.price;
    }
  });

  return result;
}

export {
  getPointsDataRange,
  getTripRoute,
  getTripPrice
};
