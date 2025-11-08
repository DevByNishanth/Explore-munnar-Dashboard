import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import DashboardHeader from "./components/DashboardHeader";
import Sidebar from "./components/Sidebar";
import { useGeneralData } from "./context/GeneralData";
import Homepage from "./pages/Homepage";
import HotelBookings from "./pages/HotelBookings";
import UsersPage from "./pages/UsersPage";
import HotelsPage from "./pages/HotelsPage";
import HotelAddForm from "./pages/HotelAddForm";
import HotelDetailsPage from "./pages/HotelDetailsPage";
import BookingPage from "./pages/BookingPage";
import LiveInformationPage from "./pages/LiveInformationPage";
import AddNewsPage from "./pages/AddNewsPage";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/hotels" element={<HotelsPage />} />
        <Route path="/Bookings" element={<BookingPage />} />
        <Route path="/hotels/:id" element={<HotelDetailsPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/hotels/addHotels" element={<HotelAddForm />} />
        <Route path="/liveInformation/addNews" element={<AddNewsPage />} />
        <Route path="/liveInformation" element={<LiveInformationPage />} />
        
      </Routes>
    </>
  );
};

export default App;
