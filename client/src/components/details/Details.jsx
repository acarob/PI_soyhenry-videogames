import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogameById } from "../../redux/actions";
import styles from "./Details.module.css";
import Navbar from "../navbar/Navbar";

const Details = (props) => {
    const id = props.match.params.id;
    const oneVideogame = useSelector((state) => state.videogameDetail)
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getVideogameById(id))
    }, [dispatch])
    
    return (
        <div>
            <Navbar/>
            <div className={styles.details}>
                <img src={oneVideogame.img} alt=''/>
                <h1>{oneVideogame.name}</h1>
                <h3>Released: {oneVideogame.released}</h3>
                <h4>Rating: {oneVideogame.rating}</h4>
                <h4>Platfroms: {oneVideogame.platforms}</h4>
                {oneVideogame.genres?.map((e) => {
                    return (
                        <h4>{e}</h4>
                    )
                })}
                <p>{oneVideogame.description}</p>
            </div>
        </div>
    )
}

export default Details;