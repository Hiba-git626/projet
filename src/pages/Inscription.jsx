import { useState } from "react"
import { Input } from "../components/Input.jsx"
import { Put } from "../components/Put.jsx"
import { Link, useNavigate } from "react-router-dom"
import API from "./api.jsx"

export function Inscription() {
  const [nom, setNom] = useState("")
  const [prenom, setPrenom] = useState("")
  const [tele, setTele] = useState("")
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  const [pass2, setPass2] = useState("")
  const [erreur, setErreur] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleRegister = async () => {
    if (!nom || !prenom || !tele || !email || !pass || !pass2) {
      setErreur("Veuillez remplir tous les champs.")
      return
    }
    if (pass !== pass2) {
      setErreur("Les mots de passe ne correspondent pas.")
      return
    }
    setLoading(true)
    setErreur(null)
    try {
      await API.post("register/", {
        last_name: nom,
        first_name: prenom,
        phone: tele,
        email: email,
        password: pass,
        password2: pass2,
      })
      navigate("/")
    } catch (err) {
      const data = err.response?.data
      if (data) {
        const messages = Object.values(data).flat().join(" ")
        setErreur(messages)
      } else {
        setErreur("Une erreur est survenue. Réessayez.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center bg-light py-5">
      <div style={{ width: "400px" }}>
        <h2 className="text-center mb-4">S'inscrire</h2>

        {erreur && <div className="alert alert-danger">{erreur}</div>}

        <label className="form-label">Nom*</label>
        <Input placeholder="Entrez votre nom" onChange={setNom} />

        <label className="form-label">Prénom*</label>
        <Input placeholder="Entrez votre prénom" onChange={setPrenom} />

        <label className="form-label">Numéro téléphone*</label>
        <Input placeholder="Entrez votre numéro de téléphone" onChange={setTele} />

        <label className="form-label">Email*</label>
        <Input placeholder="Entrez votre email" onChange={setEmail} type="email" />

        <label className="form-label">Mot de passe*</label>
        <Put placeholder="Créez un mot de passe" onChange={setPass} />

        <label className="form-label">Confirmer le mot de passe*</label>
        <Put placeholder="Confirmez votre mot de passe" onChange={setPass2} />

        <div className="text-center mt-3 mb-3">
          <button
            className="btn btn-primary w-100"
            onClick={handleRegister}
            disabled={loading}
          >
            {loading ? "Envoi..." : "S'inscrire"}
          </button>
        </div>

        <div className="text-center">
          <Link to="/">Déjà inscrit ? Se connecter</Link>
        </div>
      </div>
    </div>
  )
}
