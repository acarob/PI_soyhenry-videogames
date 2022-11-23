import React from "react";
import { Link } from "react-router-dom";
import styles from "./Card.module.css";

const Card = ({id, img, name, genres}) =>  {

    return (
        <div className={styles.contain}>
        <Link to={`/videogame/${id}`}>
            <div>
                <img src={img} alt="img not found"/>
                <h3>{name}</h3>
                {/* <p>{genres}</p> */}
                {genres?.map((e) => {
                    return (
                        <h6>{e}</h6>
                    )
                })}
            </div>
        </Link>
        </div>
    )
}

export default Card;