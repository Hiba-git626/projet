import { Link } from "react-router-dom"

export function Navbar() {
  return (
    <Link to="/Inscription" className="btn btn-link">
      Pas encore inscrit ? S'inscrire
    </Link>
  )
}
