import { useState, useEffect } from "react";

const useMobile = (): boolean => {
  const getMobileState = () => window.matchMedia("(max-width: 1024px)").matches;

  const [mobile, setMobile] = useState(getMobileState);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1024px)");

    const handleChange = () => setMobile(mediaQuery.matches);

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return mobile;
};

export default useMobile;
