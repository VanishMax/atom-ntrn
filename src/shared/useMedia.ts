import { useState } from 'react';

export const media = {
  mobile: '(max-width: 600px)',
  desktop: '(min-width: 601px)',
};

export const useMedia = (type: keyof typeof media): boolean => {
  const [matches, setMatches] = useState(window.matchMedia(media[type]).matches);

  window.addEventListener('resize', () => {
    setMatches(window.matchMedia(media[type]).matches);
  });

  return matches;
};
