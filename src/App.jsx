import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import Footer from './components/Footer'
import PhoneWallpapers from './pages/PhoneWallpapers'
import DesktopWallpapers from './pages/DesktopWallpapers'
import AboutMe from './pages/AboutMe'
import ContactUs from './pages/ContactUs'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import ComingSoon from './pages/ComingSoon'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminWallpapers from './pages/admin/AdminWallpapers'
import AdminLogin from './pages/admin/AdminLogin'
import AdminSettings from './pages/admin/AdminSettings'
import AdminCategories from './pages/admin/AdminCategories'
import AdminBadge from './components/AdminBadge'
import { HelmetProvider } from 'react-helmet-async'

export default function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <div className="" data-theme="pastel">
          <AdminBadge />
        {/* Regular site routes have navbar and footer */}
        <Routes>
          {/* Public routes */}
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <HomePage />
                <Footer />
              </>
            }
          />
          <Route
            path="/phone-wallpapers"
            element={
              <>
                <Navbar />
                <PhoneWallpapers />
                <Footer />
              </>
            }
          />
          <Route
            path="/desktop-wallpapers"
            element={
              <>
                <Navbar />
                <DesktopWallpapers />
                <Footer />
              </>
            }
          />
          <Route
            path="/about-us"
            element={
              <>
                <Navbar />
                <AboutMe />
                <Footer />
              </>
            }
          />
          <Route
            path="/contact"
            element={
              <>
                <Navbar />
                <ContactUs />
                <Footer />
              </>
            }
          />
          <Route
            path="/privacy"
            element={
              <>
                <Navbar />
                <PrivacyPolicy />
                <Footer />
              </>
            }
          />
          <Route
            path="/terms"
            element={
              <>
                <Navbar />
                <TermsOfService />
                <Footer />
              </>
            }
          />

          {/* Admin login route (no navbar/footer) */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected admin routes with admin verification */}
          <Route element={<ProtectedRoute adminOnly={true} />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/wallpapers" element={<AdminWallpapers />} />
            <Route path="/admin/categories" element={<AdminCategories />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            {/* Add more admin routes as needed */}
          </Route>
          
          {/* Catch-all route for pages that don't exist yet */}
          <Route path="*" element={
            <>
              <Navbar />
              <ComingSoon />
              <Footer />
            </>
          } />
        </Routes>
      </div>
      
    </AuthProvider>
    </HelmetProvider>
  )
}

