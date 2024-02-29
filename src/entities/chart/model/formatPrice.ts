export const formatPrice = (price: number, token?: string): string => {
  const addToken = token ? ` $${token}` : '';
  return Number(price).toFixed(2) + addToken;
};
