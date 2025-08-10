import * as React from "react";

const MOBILE_WIDTH = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_WIDTH - 1}px)`);

    const updateMobileStatus = () => {
      setIsMobile(window.innerWidth < MOBILE_WIDTH);
    };

    mediaQuery.addEventListener("change", updateMobileStatus);
    updateMobileStatus();

    return () => {
      mediaQuery.removeEventListener("change", updateMobileStatus);
    };
  }, []);

  return !!isMobile;
}
