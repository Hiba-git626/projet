import { HashRouter as Router, Routes, Route } from "react-router-dom"
import { Connexion } from "./pages/Connexion"
import { Inscription } from "./pages/Inscription"
import { Homepage } from "./pages/Homepage"
import { Annonces } from "./pages/Annonces"
import { Logement } from "./pages/Logement"
import { Profil } from "./pages/Profil"
import { Collocation } from "./pages/Collocation"
import { Modal } from "./pages/Modal"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Connexion />} />
        <Route path="/Inscription" element={<Inscription />} />
        <Route path="/Homepage" element={<Homepage />} />
        <Route path="/Annonces" element={<Annonces />} />
        <Route path="/Logement" element={<Logement />} />
        <Route path="/Profil" element={<Profil />} />
        <Route path="/Collocation" element={<Collocation/>}/>
        <Route path="/Modal" element={<Modal/>} />
      </Routes>
    </Router>
  )
}

export default App
