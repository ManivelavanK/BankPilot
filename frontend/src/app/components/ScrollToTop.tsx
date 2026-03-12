import { useEffect } from "react";
import { useLocation } from "react-router";

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll the main content area
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.scrollTop = 0;
    }
    // Also scroll window
    window.scrollTo(0, 0);
    // Force immediate scroll
    setTimeout(() => {
      if (mainContent) {
        mainContent.scrollTop = 0;
      }
      window.scrollTo(0, 0);
    }, 0);
  }, [pathname]);

  return null;
}
