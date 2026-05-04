import { useState } from "react"
import { Input } from "../components/Input"
import { useNavigate } from "react-router-dom"
import API from "./api.jsx"

export function Annonces() {
  const [titre, setTitre] = useState("")
  const [quartier, setQuartier] = useState("")
  const [descript, setDescript] = useState("")
  const [prix,setPrix]=useState("")
  const [image, setImage] = useState(null)
  const [type, setType] = useState("")
  const [preview, setPreview] = useState(null)
  const [erreur, setErreur] = useState(null)
  const [succes, setSucces] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleImage = (e) => {
    const file = e.target.files[0]
    setImage(file)
    setPreview(URL.createObjectURL(file))
  }

  const handleSubmit = async () => {
    if (!titre || !quartier || !descript || !type || !prix) {
      setErreur("Veuillez remplir tous les champs obligatoires.")
      return
    }
    setLoading(true)
    setErreur(null)
    try {
      const formData = new FormData()
      formData.append("titre", titre)
      formData.append("quartier", quartier)
      formData.append("description", descript)
      formData.append("type", type)
      formData.append("prix",prix)
      if (image) formData.append("image1", image)

      await API.post("annonce/annonce/creer/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      setSucces("Annonce créée avec succès !")
      setTimeout(() => navigate("/Logement"), 1500)
    } catch (err) {
      setErreur("Erreur lors de la création de l'annonce. Vérifiez que vous êtes connecté.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center bg-light py-5">
      <div style={{ width: "400px" }}>
        <h3 className="Div">Ajouter une annonce</h3>

        {erreur && <div className="alert alert-danger">{erreur}</div>}
        {succes && <div className="alert alert-success">{succes}</div>}

        <label className="form-label">Titre :</label>
        <Input placeholder="Titre de l'annonce" onChange={setTitre} />

        <label className="form-label">Type :</label>
        <select
          className="form-control mb-2"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">Choisir un type</option>
          <option value="logement">Logement</option>
          <option value="colocataire">Colocation</option>
        </select>

        <label className="form-label">Quartier :</label>
        <Input placeholder="Quartier" onChange={setQuartier} />

        <label className="form-label">Description :</label>
        <Input placeholder="Description" onChange={setDescript} />

        <label className="form-label">Ajouter une photo :</label>
        <input
          type="file"
          accept="image/*"
          className="form-control mb-2"
          onChange={handleImage}
        />
        {preview && (
          <img src={preview} alt="preview" className="mb-2" style={{ width: "100px" }} />
        )}
        <label className="form-label">Prix : </label>
        <br/>
        <Input placeholder="..... DH" onChange={setPrix}/>
        <div className="text-center mt-3">
          <button
            className="btn btn-primary w-50"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Envoi..." : "Envoyer"}
          </button>
        </div>
      </div>
    </div>
  )
}
