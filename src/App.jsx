import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useLang } from './i18n.jsx'
import Header from './components/Header/Header'
import HomePage from './pages/HomePage/HomePage'
import FashionPage from './pages/FashionPage/FashionPage'
import RepliFaPage from './pages/RepliFaPage/RepliFaPage'
import PerfumePage from './pages/PerfumePage/PerfumePage'
import ShoesPage from './pages/ShoesPage/ShoesPage'
import PhotographyPage from './pages/PhotographyPage/PhotographyPage'
import PhotoSeriesPage from './pages/PhotoSeriesPage/PhotoSeriesPage'
import './App.css'

function App() {
  const { lang } = useLang()
  return (
    <Router>
      <div className={`App ${lang === 'zh' ? 'lang-zh' : ''}`}>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/fashion" element={<FashionPage />} />
          <Route path="/fashion/replifa" element={<RepliFaPage />} />
          <Route path="/fashion/perfume" element={<PerfumePage />} />
          <Route path="/fashion/shoes" element={<ShoesPage />} />
          <Route path="/photography" element={<PhotographyPage />} />
          <Route path="/photography/:slug" element={<PhotoSeriesPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
