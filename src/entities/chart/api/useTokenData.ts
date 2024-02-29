import { useEffect, useState } from 'react';
import type { FetchNeutronResult, TokenInfo } from '../model';
import { adaptTokenData } from '../model';

const BASE_URL = 'https://app.astroport.fi/api/trpc/charts.prices?input=';

const NTRN_ARGS = {
  json: {
    tokens: [
      "ibc/C4CFF46FD6DE35CA4CF4CE031E643C8FDC9BA4B99AE598E9B0ED98FE3A2319F9",
      "untrn"
    ],
    chainId: "neutron-1",
    dateRange: "D7",
  },
};

export const useTokenData = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<TokenInfo>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(BASE_URL + encodeURIComponent(JSON.stringify(NTRN_ARGS)));
        const data = await res.json() as FetchNeutronResult;
        if (data.result.data.json) {
          setData(adaptTokenData(
            data.result.data.json['ibc/C4CFF46FD6DE35CA4CF4CE031E643C8FDC9BA4B99AE598E9B0ED98FE3A2319F9'],
            data.result.data.json.untrn
          ));
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    loading,
    data,
  };
};
