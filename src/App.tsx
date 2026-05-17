import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@/context/ThemeContext'
import LandingPage from '@/pages/LandingPage'
import SignUpPage from '@/pages/SignUpPage'

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
