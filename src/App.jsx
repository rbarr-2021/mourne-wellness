import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Treatments from "./pages/Treatments"
import About from "./pages/About"
import ScrollToTop from "./components/ScrollToTop"
import AuthProvider from "./components/AuthProvider"
import PublicLayout from "./components/PublicLayout"
import ProtectedRoute from "./components/ProtectedRoute"
import AdminLayout from "./components/AdminLayout"
import AdminLogin from "./pages/AdminLogin"
import AdminForgotPassword from "./pages/AdminForgotPassword"
import AdminAuthCallback from "./pages/AdminAuthCallback"
import AdminResetPassword from "./pages/AdminResetPassword"
import AdminDashboard from "./pages/admin/AdminDashboard"
import AdminAvailability from "./pages/admin/AdminAvailability"
import AdminBookings from "./pages/admin/AdminBookings"
import AdminSettings from "./pages/admin/AdminSettings"
import AdminTreatments from "./pages/admin/AdminTreatments"
import "./styles/site.css"

function App() {
  return (
    <Router>
      <AuthProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/forgot-password" element={<AdminForgotPassword />} />
          <Route path="/admin/auth/callback" element={<AdminAuthCallback />} />
          <Route path="/admin/reset-password" element={<AdminResetPassword />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="availability" element={<AdminAvailability />} />
              <Route path="bookings" element={<AdminBookings />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="treatments" element={<AdminTreatments />} />
            </Route>
          </Route>

          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/treatments" element={<Treatments />} />
            <Route path="/about" element={<About />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
