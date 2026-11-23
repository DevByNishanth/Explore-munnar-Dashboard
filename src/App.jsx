import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
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
import HomepageSlidesPage from "./pages/HomepageSlidesPage";
import ReviewsPage from "./pages/ReviewsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginModal from "./components/LoginModal";
import { useAuth } from "./context/AuthContext";

function LoginEntry() {
  const { login, signup, user, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const destination = location.state?.from?.pathname || "/";
  if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-600">Loading...</div>;
  if (user?.role === "ADMIN") return <Navigate to={destination} replace />;
  return <LoginModal open onClose={() => navigate("/")} onLogin={login} onSignup={signup} onSuccess={() => navigate(destination, { replace: true })} accessDenied={location.state?.accessDenied} />;
}
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginEntry />} />
        <Route element={<ProtectedRoute requiredRole="ADMIN" />}>
          <Route path="/" element={<Homepage />} />

          <Route path="/Bookings" element={<BookingPage />} />
          <Route path="/activities" element={<ActivitiesPage />} />
          <Route path="/itnearies" element={<ItnearyPage />} />
          <Route path="/hotels/:id" element={<HotelDetailsPage />} />
          <Route path="/activites/:id" element={<ActivitiesDetailsPage />} />
          <Route path="/users" element={<UsersPage />} />

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
          <Route path="/homepageSlides" element={<HomepageSlidesPage />} />
          <Route path="/BusTimings" element={<BusTimingsPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
        </Route>
        
        <Route path="/hotels/addHotels" element={<HotelAddForm />} /> F
        <Route path="/hotels" element={<HotelsPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
