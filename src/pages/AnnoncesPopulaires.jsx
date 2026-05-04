import { useEffect, useState } from "react"
import API from "../pages/api.jsx"
import { Toaster, toast } from "react-hot-toast"
import { Link } from "react-router-dom"
import "../components/Nav.css"
import { Modal } from "./Modal.jsx"

export function AnnooncesPopulaires() {
  const [annonces, setAnnonces] = useState([])
  const [loading, setLoading] = useState(true)
  const [erreur, setErreur] = useState(null)

  useEffect(() => {
    API.get("annonce/annonces/populaires/")
      .then((response) => {
        setAnnonces(response.data)
        setLoading(false)
      })
      .catch(() => {
        setErreur("Erreur de chargement des annonces.")
        setLoading(false)
      })
  }, [])

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

  if (loading) return <p>Chargement...</p>
  if (erreur) return <p className="text-danger">{erreur}</p>
  if (annonces.length === 0) return <p>Aucune annonce disponible.</p>

  return (
    <>
      {/* ✅ Toaster affiché une seule fois ici */}
      <Toaster position="top-right" />
      <Link to="/Modal">
      <div className="container" style={{marginRight:"100px"}}>
        <div className="row g-3 justify-content-start" >
          {annonces.map((annonce) => (
            <div className="col-sm-6 col-md-6 col-lg-4" key={annonce.id} 
            style={{maxHeight:"400px"}}>
              <div
                className="card shadow-sm h-100 d-flex flex-column"
                style={{ borderRadius: "12px", overflow: "hidden", position: "relative" }}
              >

                {/* ✅ Bouton suppression positionné en haut à gauche */}
                <button
                  onClick={() => handleDelete(annonce.id)}
                  style={{
                    position: "absolute",
                    bottom: "8px",
                    left: "8px",
                    zIndex: 10,
                    background: "rgba(255,255,255,0.9)",
                    border: "none",
                    borderRadius: "50%",
                    width: "34px",
                    height: "34px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "16px",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
                  }}
                  title="Supprimer cette annonce"
                >
                  🗑️
                </button>

                {/* ✅ Badge type en haut à droite */}
                <span
                  className="badge bg-primary"
                  style={{
                    position: "absolute",
                    top: "8px",
                    right: "8px",
                    zIndex: 10,
                    fontSize: "0.75rem",
                    padding: "5px 10px",
                    borderRadius: "20px",
                  }}
                >
                  {annonce.type}
                </span>

                {/* ✅ Image toujours présente — placeholder si pas d'image */}
                <img
                  src={
                    annonce.image1
                      ? `http://localhost:8000${annonce.image1}`
                      : "https://placehold.co/400x200/e9ecef/6c757d?text=Pas+d%27image"
                  }
                  alt={annonce.titre}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover", flexShrink: 0 }}
                />

                {/* ✅ Body flex pour pousser le prix en bas */}
                <div className="card-body d-flex flex-column flex-grow-1 p-3">

                  <h5 className="card-title mb-1" style={{ fontSize: "1rem" }}>
                    {annonce.titre}
                  </h5>

                  <p className="card-text text-muted small mb-2">
                    📍 {annonce.quartier}
                  </p>

                  {/* ✅ Description — flex-grow-1 absorbe l'espace variable */}
                  <p
                    className="card-text small text-secondary flex-grow-1"
                    style={{ lineHeight: "1.4" }}
                  >
                    {annonce.description?.slice(0, 80)}...
                  </p>

                  {/* ✅ Prix toujours collé en bas */}
                  <div className="mt-auto pt-2">
                    <span
                      className="price"
                      style={{ fontSize: "0.85rem", borderRadius: "12px" }}
                    >
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
      </Link>
    </>
  )
}