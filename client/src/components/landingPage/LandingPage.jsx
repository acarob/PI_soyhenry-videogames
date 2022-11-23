import React from "react"; //creo un componente funcional.
import { Link } from "react-router-dom";
import estilos from "./LandingPage.module.css"

const LandingPage = () =>  {
    return (
        <div>
            <div className={estilos.image}>
                <Link to="/home">
                <button className={estilos.button}>Enter</button>
                </Link>  
            </div>
        </div>
    )
}

export default LandingPage;