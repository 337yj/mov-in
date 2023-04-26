import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop({ children }) {
  const { pathname } = useLocation();

  useEffect(() => {
    //console.log("Scroll To Top");
    window.scrollTo({
      top: 0,
    });
  }, [pathname]);

  return <>{children}</>;
}
