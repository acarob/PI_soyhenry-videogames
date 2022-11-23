import React from "react"; //creo un componente funcional.
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getAllVideogames } from "../../redux/actions";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./Navbar.module.css";

const Navbar = () =>  {
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(getAllVideogames())
    }
    return (
        <div className={styles.bar}>
            <Link to="/home" onClick={handleClick}>Home</Link>
            <Link to="/create">Create</Link>
            <div>
                <SearchBar/>
            </div>
        </div>
    )
}

export default Navbar;