import "../components/Nav.css"
import { Link, useNavigate } from "react-router-dom"
import { AnnooncesPopulaires } from "./AnnoncesPopulaires"
import {useEffect, useState } from "react"
import API from "./api.jsx"


export function Homepage() {
  const [profil, setProfil] = useState(false)
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    API.get("profile/")
      .then((res) => setUser(res.data))
      .catch(() => {}) 
  },[])

  const handleDeconnexion = () => {
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    navigate("/")
  }

  return (
    <>
      <header>
        <ul className="navbar">
          <div className="resid">
          <h2>ResidLink</h2>
          </div>
          <Link to="/Homepage">
            <li className="ac"><strong>Accueil</strong></li>
          </Link>
          <Link to="/Logement">
            <li className="acceuil"><strong>Logement</strong></li>
          </Link>
          <Link to="/Collocation">
            <li className="euil"><strong>Collocation</strong></li>
          </Link>
          <li style={{ position: "relative" }}>
            <Link
              onClick={() => setProfil(!profil)}
              title="Mon Profil"
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: "50px", height: "50px", borderRadius: "50px",
                background: "rgba(255, 255, 255, 0.2)", border: "2px solid rgba(255,255,255,0.6)",
                color: "white", padding: "5px", marginRight: "50px",
              }}
            >
              <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>
            </Link>
            {profil && (
              <div style={{
                position: "absolute", top: "50px", right: "0",
                background: "white", borderRadius: "12px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                padding: "16px", minWidth: "250px", zIndex: 1000,
              }}>
                <div style={{ textAlign: "center", marginBottom: "12px" }}>
                  <div style={{
                    width: "60px", height: "60px", borderRadius: "50%",
                    background: "blue", display: "flex", alignItems: "center",
                    justifyContent: "center", margin: "0 auto 8px",
                    fontSize: "24px", color: "white", fontWeight: "bold",
                  }}>
                    {user?.first_name?.[0]?.toUpperCase() || "H"}
                    </div>
                </div>
                <hr style={{ border: "none", borderTop: "1px solid #eee", margin: "12px 0" }} />
                <Link to="/Profil" onClick={() => setProfil(false)}
                  style={{ display: "block", padding: "8px 12px", color: "#333", textDecoration: "none", borderRadius: "8px" }}>
                  👤 Mon profil
                </Link>
                <Link to="/Connexion">
                <button onClick={handleDeconnexion}
                  style={{ display: "block", width: "100%", textAlign: "left", padding: "8px 12px", color: "#e53e3e",
                    background: "none", border: "none", borderRadius: "8px", cursor: "pointer" }}>
                  🚪 Se déconnecter
                </button>
                </Link>
              </div>
            )}
          </li>
        </ul>
      </header>

      <div className="img">
        <div className="descr">
          <p className="text1"><strong>Votre espace étudiant qui vous aide</strong></p>
          <p className="text2">Inscrivez-vous pour faciliter votre vie étudiante</p>
        </div>
      </div>

      <div className="ajouter">
        <Link to="/Annonces">
          <button className="btn btn-outline-secondary btn-lg h-100">
            + Ajouter une annonce
          </button>
        </Link>
      </div>

      <div className="annonce">
        <h3>Annonces populaires 🔥 </h3>
        <AnnooncesPopulaires />
      </div>

      <footer>
        <div className="right">
          <p>© Copyright</p>
          <p>Tous droits réservés</p>
        </div>
      </footer>
    </>
  )
}
