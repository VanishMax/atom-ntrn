export interface TokenSeriesEntry {
  value: number;
  time: Date;
}

export interface TokenInfo {
  currentPrice: number;
  priceChangePercentage: number;
  minValue: number,
  maxValue: number,
  average: number;
  series: TokenSeriesEntry[];
}

export interface TokenApiInfo {
  priceChangePercentage: number;
  minValue: number,
  maxValue: number,
  series: {
    time: number;
    value: number;
  }[]
}


export interface FetchNeutronResult {
  result: {
    data: {
      json: {
        'ibc/C4CFF46FD6DE35CA4CF4CE031E643C8FDC9BA4B99AE598E9B0ED98FE3A2319F9': TokenApiInfo;
        untrn: TokenApiInfo;
      }
    }
  }
}
