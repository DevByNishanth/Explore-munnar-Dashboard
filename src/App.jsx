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
import ActivitiesPage from "./ActivitiesPage";
import ItnearyPage from "./pages/ItnearyPage";
import ActivitiesDetailsPage from "./pages/ActivitiesDetailsPage";
import AddActivityFormPage from "./pages/AddActivityFormPage";
import Testingpage from "./pages/Testingpage";
import HomepageModificationPage from "./pages/HomepageModificationPage";
import ReportsPage from "./pages/ReportsPage";
import BusTimingsPage from "./pages/BusTimingsPage";
import EditHotelPage from "./pages/EditHotelPage";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/hotels" element={<HotelsPage />} />
        <Route path="/Bookings" element={<BookingPage />} />
        <Route path="/activities" element={<ActivitiesPage />} />
        <Route path="/itnearies" element={<ItnearyPage />} />
        <Route path="/hotels/:id" element={<HotelDetailsPage />} />
        <Route path="/activites/:id" element={<ActivitiesDetailsPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/hotels/addHotels" element={<HotelAddForm />} />
        <Route path="/hotels/editHotel/:id" element={<EditHotelPage />} />
        <Route
          path="/activities/addActivity"
          element={<AddActivityFormPage />}
        />
        <Route path="/liveInformation/addNews" element={<AddNewsPage />} />
        <Route path="/liveInformation" element={<LiveInformationPage />} />
        <Route
          path="/homepageModification"
          element={<HomepageModificationPage />}
        />
        <Route path="/BusTimings" element={<BusTimingsPage />} />
        <Route path="/reports" element={<ReportsPage />} />
      </Routes>
    </>
  );
};

export default App;
