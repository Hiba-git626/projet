import { useEffect, useState } from "react"
import API from "./api.jsx"
import { Link, useNavigate } from "react-router-dom"
import "../components/Nav.css"
import { Toaster, toast } from "react-hot-toast"

export function Profil() {
  const [annonces, setAnnonces] = useState([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [profil, setProfil] = useState(false)
  const navigate = useNavigate()

  const handleDeconnexion = () => {
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    navigate("/")
  }

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Supprimer cette annonce ?")
    if (!confirmDelete) return
    try {
      await API.delete(`annonce/annonce/${id}/supprimer/`)
      setAnnonces((prev) => prev.filter((a) => a.id !== id))
      toast.success("Annonce supprimée avec succès !")
    } catch {
      toast.error("Erreur lors de la suppression.")
    }
  }

  useEffect(() => {
    API.get("profile/")
      .then((res) => setUser(res.data))
      .catch(() => {})

    API.get("annonce/annonces/moi/")
      .then((res) => {
        setAnnonces(res.data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <>
      <Toaster position="top-right" />

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
                <button onClick={handleDeconnexion}
                  style={{
                    display: "block", width: "100%", textAlign: "left", padding: "8px 12px", color: "#e53e3e",
                    background: "none", border: "none", borderRadius: "8px", cursor: "pointer"
                  }}>
                  🚪 Se déconnecter
                </button>
              </div>
            )}
          </li>
        </ul>
      </header>

      <div className="container mt-5">
        <h2>Mon Profil </h2>

        <div className="card p-4 mb-4text-center" style={{marginLeft:"250px" ,
          width:"800px" ,margin:"30px",borderRadius:"16px", alignItems:"center"}}>
          <div style={{
            width: "60px", height: "60px", borderRadius: "50%",
            background: "blue", display: "flex", alignItems: "center",
            justifyContent: "center", margin: "0 auto 16px",
            fontSize: "24px", color: "white", fontWeight: "bold",
          }}>
            {user?.first_name?.[0]?.toUpperCase() || "H"}
          </div>
          {user ? (
            <>
              <p><strong>Nom :</strong> {user.last_name}</p>
              <p><strong>Prénom :</strong> {user.first_name}</p>
              <p><strong>Téléphone :</strong> {user.phone}</p>
              <p><strong>Email :</strong> {user.email}</p>
            </>
          ) : (
            <p>Chargement du profil...</p>
          )}
        </div>

        <h3 className="mt-5 ml-5">Mes annonces</h3>
         <Link to ="/Modal">
        {loading ? (
          <p>Chargement...</p>
        ) : annonces.length === 0 ? (
          <p>Vous n'avez pas encore d'annonces.</p>
        ) : (
        
        <div className="container" style={{marginLeft:"70px"}}> 
        <div className="row g-3 justify-content-start" >
              {annonces.map((annonce) => (
                <div className="col-sm-6 col-md-6 col-lg-4" key={annonce.id}
                >
                  <div
                    className="card shadow-sm h-100 d-flex flex-column"
                    style={{ borderRadius: "12px", overflow: "hidden", position: "relative" }}
                  >
                    <button
                      onClick={() => handleDelete(annonce.id)}
                      style={{
                        position: "absolute", bottom: "8px", left: "8px", zIndex: 10,
                        background: "rgba(255,255,255,0.9)", border: "none", borderRadius: "50%",
                        width: "34px", height: "34px", cursor: "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "16px", boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
                      }}
                      title="Supprimer cette annonce"
                    >
                      🗑️
                    </button>

                    <span className="badge bg-primary" style={{
                      position: "absolute", top: "8px", right: "8px", zIndex: 10,
                      fontSize: "0.75rem", padding: "5px 10px", borderRadius: "20px",
                    }}>
                      {annonce.type}
                    </span>

                    <div
                     style={{
                          width: "100%",
                          height: "200px",
                          backgroundImage: `url(${
                              annonce.image1
                                 ? `http://localhost:8000${annonce.image1}`
                                 : "https://placehold.co/400x200/e9ecef/6c757d?text=Pas+d%27image"
                     })`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          borderTopLeftRadius: "12px",
                          borderTopRightRadius: "12px"
                           
 
  }}>

  </div>
  
  


                    <div className="card-body d-flex flex-column flex-grow-1 p-3">
                      <h5 className="card-title mb-1" style={{ fontSize: "1rem" }}>
                        {annonce.titre}
                      </h5>
                      <p className="card-text text-muted small mb-2">
                        📍 {annonce.quartier}
                      </p>
                      <p className="card-text small text-secondary flex-grow-1" style={{ lineHeight: "1.4" }}>
                        {annonce.description?.slice(0, 80)}...
                      </p>
                      <div className="mt-auto pt-2">
                        <span className="price" style={{ fontSize: "0.85rem", borderRadius: "8px" }}>
                          {annonce.loyer
                            ? `${annonce.loyer} DH / mois`
                            : annonce.prix_vente
                            ? `${annonce.prix_vente} DH`
                            : "Prix non disponible"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
            </div>
            </div>
            
         
        )}
        </Link>
        <Link to="/Connexion">
        <button className="btn btn-outline-primary mt-4 mb-5" onClick={() => navigate("/Homepage")}>
          ← Retour à l'accueil
        </button>
        </Link>
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