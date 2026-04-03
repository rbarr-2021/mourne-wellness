import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Analytics } from '@vercel/analytics/react';

import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Treatments from "./pages/Treatments"
import About from "./pages/About"
import Footer from "./components/Footer"
import ScrollToTop from "./components/ScrollToTop"


function App() {
  return (

    <Router>

      <Navbar />

<ScrollToTop /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/treatments" element={<Treatments />} />
         <Route path="/about" element={<About />} />

      </Routes>
       
<Footer /> 
<Analytics />
    </Router>

  )
}

export default App