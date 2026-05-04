import { useState } from "react"
import { Input } from "../components/Input.jsx"
import { Checkbox } from "../components/Checkbox.jsx"
import { Navbar } from "../components/Navbar.jsx"
import { Put } from "../components/Put.jsx"
import { Link, useNavigate } from "react-router-dom"
import API from "./api.jsx"

export function Connexion() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [checked, setChecked] = useState(false)
  const [erreur, setErreur] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async () => {
    if (!email || !password) {
      setErreur("Veuillez remplir tous les champs.")
      return
    }
    setLoading(true)
    setErreur(null)
    try {
      const response = await API.post("login/", { email, password })
      localStorage.setItem("access_token", response.data.access)
      localStorage.setItem("refresh_token", response.data.refresh)
      navigate("/Homepage")
    } catch (err) {
      setErreur("Email ou mot de passe incorrect.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="d-flex justify-content-center vh-100 align-items-center bg-light">
      <div style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Connexion</h2>

        {erreur && <div className="alert alert-danger">{erreur}</div>}

        <div className="mb-3">
          <label className="form-label">Email</label>
          <Input placeholder="hiba@gmail.com" onChange={setEmail} type="email" />
        </div>

        <label className="form-label">Mot de passe</label>
        <Put placeholder="Votre mot de passe" onChange={setPassword} />

        <Checkbox onChange={() => setChecked(!checked)} />

        <div className="text-center">
          <button
            className="btn btn-primary w-70"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
          <br />
          <div className="btn">
            <Navbar />
          </div>
        </div>
      </div>
    </div>
  )
}
