import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getVideogameByName } from "../../redux/actions";
import styles from "./SearchBar.module.css";

const SearchBar = () => {
    const [name, setName] = useState("")
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        dispatch(getVideogameByName(name))
        setName(e.target.value = "")
    }
    const handleChange = (e) => {
        setName(e.target.value)
    }
    return (
        <div className={styles.search}>
          <input type='text' placeholder='Videogame...' onChange={e => handleChange(e)} value = {name}/>
          <button onClick={(e) => handleSubmit(e)} className = {styles.btn}>Search</button>
        </div>)
}

export default SearchBar;