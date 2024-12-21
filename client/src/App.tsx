import { BrowserRouter, Route, Routes } from "react-router-dom"
import RootLayout from "./layouts/root-layout"
import AuthPage from "./pages/auth/page"
import LandingPage from './pages/landing-page/page';
import MainLayout from "./layouts/main-nav-layout";
import { Toaster } from "react-hot-toast"
import DashboardPage from "./pages/dashboard/page";
import { ProtectedRoute } from './layouts/ProtectedLayout';
import ProfilePage from './pages/profile/page';
import { UserContextProvider } from './context/UserContext';
import AddContactPage from './pages/add-contact/page';
import ContactsPage from "./pages/contacts/page";
import AboutPage from "./pages/about/page";
import ServicesPage from "./pages/services/page";
import NotFoundPage from "./pages/not-found/page";
import VerifyAccount from './pages/auth/verifyAccount/page';
import { SendEmail } from "./pages/sendEmail/page";

const App = () => {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <Toaster position="top-center" reverseOrder={false} />

        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={
              <ProtectedRoute isAuth={true}>
                <AuthPage />
              </ProtectedRoute>
            } />
            <Route path="/auth/verifyAccount" element={
              <ProtectedRoute isAuth={true}>
                <VerifyAccount />
              </ProtectedRoute>
            } />

            {/* Makes it a protected route sync with the backend */}
            <Route element={<MainLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/add-contact" element={<AddContactPage />} />
              <Route path="/contacts" element={<ContactsPage />} />
              <Route path="/contact/sendEmail" element={<SendEmail />} />
            </Route>

            {/* 404 page */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </UserContextProvider>
    </BrowserRouter>
  )
}

export default App