import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import HomePage from './pages/HomePage/HomePage'
import FashionPage from './pages/FashionPage/FashionPage'
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
          <Route path="/photography" element={<PhotographyPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
