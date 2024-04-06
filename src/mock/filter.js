import { FilterType } from '../const';
import { isFuturedPoint, isPresentedPoint, isPastedPoint } from '../utils/points-utils';

const filter = {
  [FilterType.EVERYTHING]: (points) => [points],
  [FilterType.FUTURE]: (points) => points.filter((point) => isFuturedPoint(point)),
  [FilterType.PRESENT]: (points) => points.filter((point) => isPresentedPoint(point)),
  [FilterType.PAST]: (points) => points.filter((point) => isPastedPoint(point)),
};

function generateFilters(points) {
  return Object.entries(filter).map(
    ([filterType, filterPoints]) => ({
      type: filterType,
      count: filterPoints(points).length
    })
  );
}

export { generateFilters };

