import type { TokenInfo, TokenApiInfo, TokenSeriesEntry } from './index.ts';

/**
 * Takes data of two token, which price is calculated in USD, and divides to first token to the second, producing a pair.
 */
export const adaptTokenData = (from: TokenApiInfo, to: TokenApiInfo): TokenInfo => {
  const secondSeries = to.series.reduce(((accum, entry) => {
    accum[entry.time] = entry.value;
    return accum;
  }), {} as Record<number, number>);

  let maxValue = 0;
  let minValue = Infinity;
  let averageSum = 0;

  const calculatedSeries = from.series.reduce((accum, entry) => {
    if (!secondSeries[entry.time]) return accum;

    const calculatedValue = entry.value / secondSeries[entry.time];
    if (calculatedValue > maxValue) maxValue = calculatedValue;
    if (calculatedValue < minValue) minValue = calculatedValue;
    averageSum += calculatedValue;

    accum.push({
      time: new Date(entry.time * 1000),
      value: calculatedValue,
    });
    return accum;
  }, [] as TokenSeriesEntry[]);

  const lastPrice = calculatedSeries[calculatedSeries.length - 1].value;
  const firstPrice = calculatedSeries[0].value;

  return {
    currentPrice: lastPrice,
    maxValue,
    minValue,
    average: averageSum / calculatedSeries.length,
    priceChangePercentage: (lastPrice - firstPrice) / firstPrice * 100,
    series: calculatedSeries,
  }
};
