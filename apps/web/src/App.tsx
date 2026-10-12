import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@/context/ThemeContext'
import { AuthProvider } from '@/context/AuthContext'
import ProtectedRoute from "@/components/ProtectedRoute"
import LandingPage from '@/pages/LandingPage'
import SignUpPage from '@/pages/SignUpPage'
import ConfirmEmailPage from '@/pages/ConfirmEmailPage'
import EmailVerifiedPage from "@/pages/EmailVerifiedPage"
import LoginPage from '@/pages/LoginPage'
import DashboardPage from '@/pages/DashboardPage'
import ScrollToHash from '@/components/ScrollToHash'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ScrollToHash />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/confirm-email" element={<ConfirmEmailPage />} />
          <Route path="/email-verified" element={<EmailVerifiedPage />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
