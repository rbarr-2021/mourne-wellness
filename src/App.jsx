import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Treatments from "./pages/Treatments"
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
       
      </Routes>
       
<Footer /> 
    </Router>

  )
}

export default App