import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SearchResults from "./pages/SearchResults";
import BusDetails from "./pages/BusDetails";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/signup" element={<Signup />} />

      <Route path="/search" element={<SearchResults />} />

      <Route path="/bus/:id" element={<BusDetails />} />
    </Routes>
  );
};

export default App;
