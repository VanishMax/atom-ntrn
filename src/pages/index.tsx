import { FC } from 'react';
import clsx from 'clsx';

import { formatPercent, formatPrice, TokenChart, useTokenData } from '../entities/chart';
import styles from './index.module.css';

const Y_TOKEN = 'NTRN';

export const HomePage: FC = () => {
  const { data } = useTokenData();

  if (!data) {
    return null;
  }

  return (
    <main className={styles.page}>
      <h1>$ATOM</h1>

      <div className={styles.header}>
        <p className={clsx(styles.price, {[styles.negative]: data.priceChangePercentage <= 0})}>
          {formatPrice(data.currentPrice, Y_TOKEN)}{' '}
          <span>
            {data.priceChangePercentage <= 0 ? '↓' : '↑'}
            {formatPercent(data.priceChangePercentage)}
          </span>
        </p>
      </div>

      <TokenChart series={data.series} token={Y_TOKEN}/>

      <p className={styles.minmax}>
        <span>Min: {formatPrice(data.minValue, Y_TOKEN)}</span>
        <span>Max: {formatPrice(data.maxValue, Y_TOKEN)}</span>
        <span>Avg: {formatPrice(data.average, Y_TOKEN)}</span>
      </p>
    </main>
  );
};
