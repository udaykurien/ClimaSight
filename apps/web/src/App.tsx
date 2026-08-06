import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@/context/ThemeContext'
import LandingPage from '@/pages/LandingPage'
import SignUpPage from '@/pages/SignUpPage'
import ConfirmEmailPage from '@/pages/ConfirmEmailPage'
import EmailVerifiedPage from "@/pages/EmailVerifiedPage"

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/confirm-email" element={<ConfirmEmailPage />} />
        <Route path="/email-verified" element={<EmailVerifiedPage /> } />
      </Routes>
    </ThemeProvider>
  )
}

export default App
