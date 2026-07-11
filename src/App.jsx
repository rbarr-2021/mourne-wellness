import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Treatments from "./pages/Treatments"
import About from "./pages/About"
import Footer from "./components/Footer"
import ScrollToTop from "./components/ScrollToTop"
import "./styles/site.css"

function App() {
  return (
    <Router>
      <div className="app-shell">
      <Navbar />
      <ScrollToTop />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/treatments" element={<Treatments />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
