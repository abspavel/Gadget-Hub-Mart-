import React, { useEffect } from 'react';

interface ScrollToTopProps {
  currentView: any;
}

export const ScrollToTop: React.FC<ScrollToTopProps> = ({ currentView }) => {
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    // Also reset any scrollable container elements if active
    const scrollContainers = document.querySelectorAll('.overflow-y-auto');
    scrollContainers.forEach(container => {
      container.scrollTop = 0;
    });
  }, [currentView]);

  return null;
};
