import styles from "./Home.module.css";
import { getAllVideogames, filterCreated, orderByName, orderByRating } from "../../redux/actions";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../card/Card";
import Navbar from "../navbar/Navbar";
import Paginate from "../paginate/Paginate";

const Home = () => {
    const dispatch = useDispatch()
    const allVideogames = useSelector((state) => state.filtered) //state.videogames was before
    // console.log(allVideogames)
    const [order, setOrder] = useState('')

    //paginate
    const [currentPage, setCurrentPage] = useState(1);
    const [videogamesPerPage, setVideogamesPerPage] = useState(15);
    const indexOfLastVideogame = currentPage * videogamesPerPage;
    const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;
    const currentVideogames = allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame);
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const handleFilteredCreated = (param) => {
        dispatch(filterCreated(param.target.value));
    }

    //order by name
    const handleSort = (e) => {
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setOrder(`Ordered ${e.target.value}`)
    }

    //order by rating
    const handleRating = (e) => {
        e.preventDefault();
        dispatch(orderByRating(e.target.value))
        setCurrentPage(1);
        setOrder(`Ordered ${e.target.value}`)
    }

    useEffect(() => {
        dispatch(getAllVideogames())
    },  [dispatch]);
        return (
            <div className={styles.background}>
                <div>
                    <Navbar/>
                </div>
                <div className={styles.font}>
                    <h1>Videogames</h1>
                </div>
                <div>
                <select onChange={e => handleSort(e)}>
                    <option value="az">From A to Z</option>
                    <option value="za">From Z to A</option>
                </select>
                <select onChange={e => handleRating(e)}>
                    <option value="min">Lower rating</option>
                    <option value="max">Higher rating</option>
                </select>
                <select onChange={(e)=>{handleFilteredCreated(e)}}>
                    <option value="all">All</option>
                    <option value="videogamesDb">Created</option>
                    <option value="api">Existent</option>
                </select>
                </div>
                    <Paginate
                    videogamesPerPage={videogamesPerPage}
                    allVideogames={allVideogames.length}
                    paginate={paginate}
                    />
                <div className={styles.cards}>
            {
                currentVideogames?.map(e => {
                    return (
                        <div className={styles.card}>
                        <Card
                        name = {e.name}
                        img = {e.img}
                        genres = {e.genres}
                        id = {e.id}
                        />
                        </div>
                    )
                })
            }
                </div>
            </div>
        )
}

export default Home;