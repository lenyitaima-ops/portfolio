import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import HomePage from './pages/HomePage/HomePage'
import FashionPage from './pages/FashionPage/FashionPage'
import RepliFaPage from './pages/RepliFaPage/RepliFaPage'
import PerfumePage from './pages/PerfumePage/PerfumePage'
import PhotographyPage from './pages/PhotographyPage/PhotographyPage'
import ContactPage from './pages/ContactPage/ContactPage'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/fashion" element={<FashionPage />} />
          <Route path="/fashion/replifa" element={<RepliFaPage />} />
          <Route path="/fashion/perfume" element={<PerfumePage />} />
          <Route path="/photography" element={<PhotographyPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
