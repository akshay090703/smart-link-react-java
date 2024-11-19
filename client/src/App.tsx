import { BrowserRouter, Route, Routes } from "react-router-dom"
import RootLayout from "./layouts/root-layout"
import AuthPage from "./pages/auth/page"
import LandingPage from './pages/landing-page/page';
import MainLayout from "./layouts/main-nav-layout";
import HomePage from "./pages/home/page";
import { Toaster } from "react-hot-toast"

const App = () => {
  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />

          <Route element={<MainLayout />}>
            <Route path="/home" element={<HomePage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App