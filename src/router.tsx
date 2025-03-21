import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/app/Home/Home";

const RouterConfig = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="*" element={<NotFound />} />{" "} */}
      </Routes>
    </Router>
  );
};

export default RouterConfig;
