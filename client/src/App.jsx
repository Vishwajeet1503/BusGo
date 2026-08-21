import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SearchResults from "./pages/SearchResults";
import BusDetails from "./pages/BusDetails";
import PassengerDetails from "./pages/PassengerDetails";
import Payment from "./pages/Payment";
import BookingConfirmation from "./pages/BookingConfirmation";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/signup" element={<Signup />} />

      <Route path="/search" element={<SearchResults />} />

      <Route path="/bus/:id" element={<BusDetails />} />

      <Route path="/passenger-details" element={<PassengerDetails />} />

      <Route path="/payment" element={<Payment />} />

      <Route path="/booking-confirmation" element={<BookingConfirmation />} />

      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default App;
