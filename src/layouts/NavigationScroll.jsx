import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// thirty-party
import PropTypes from "prop-types";

const NavigationScroll = ({ children }) => {
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return children || null;
};

NavigationScroll.propTypes = {
  children: PropTypes.element,
};

export default NavigationScroll;
