import { useState} from "react";
import API from "./api";

export function Modal(){

    const [selected,setSelected]=useState(null)

    return (
        <>
        <div className="card shadow-sm h-100 d-flex flex-column"
        style={{borderRadius:"12px",position:"relative",overflow:"hidden",cursor:"pointer"}}
        onClick={()=>setSelected(annonce)}>

            {selected && (
            <div style={{position:"fixed", insert:0,display:"flex",alignItems:"center",
                background:"rgba(0,0,0,0.6)",justifyContent:"center",zIndex: 2000
            }}>
                <div style={{backgroundColor:"white",borderRadius:"16px",width:"600px",
                    maxWidth:"90%",maxHeight:"85vh",overflow:"auto",padding: "24px",
                    position: "relative"
                }}>

                <button onClick={()=>setSelected(null)} 
                   style={{position: "absolute", top: "12px", right: "16px",
        background: "none", border: "none", fontSize: "20px", cursor: "pointer"}}  
      >✕</button>

       <div style={{
        width: "100%", height: "250px",
        backgroundImage: `url(${selected.image1 ? `http://localhost:8000${selected.image1}` : "https://placehold.co/600x250/e9ecef/6c757d?text=Pas+d%27image"})`,
        backgroundSize: "cover", backgroundPosition: "center", borderRadius: "12px", marginBottom: "16px"
      }} />

       <h4>{selected.titre}</h4>
      <p className="text-muted">📍 {selected.quartier}</p>
      <p>{selected.description}</p>
      <hr />
      <p><strong>Prix :</strong> {selected.loyer ? `${selected.loyer} DH / mois` : selected.prix_vente ? `${selected.prix_vente} DH` : "Non disponible"}</p>
      <p><strong>Type :</strong> {selected.type}</p>
                </div>
            </div>
      
        

        )}
         </div>
        </>
    )
}