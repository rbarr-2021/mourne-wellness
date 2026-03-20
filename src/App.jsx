import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Treatments from "./pages/Treatments"
import About from "./pages/About"
import Footer from "./components/Footer"
import ScrollToTop from "./components/ScrollToTop"
import { Analytics } from "@vercel/analytics/next"

function App() {
  return (

    <Router>

      <Navbar />

<ScrollToTop /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/treatments" element={<Treatments />} />
         <Route path="/about" element={<About />} />
         
<Analytics />
      </Routes>
       
<Footer /> 
    </Router>

  )
}

export default App