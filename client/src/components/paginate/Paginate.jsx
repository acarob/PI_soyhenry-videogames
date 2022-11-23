import React from "react";
import styles from "./Paginate.module.css"

const Paginate = ({videogamesPerPage, allVideogames, paginate}) => {
    const pageNumber = []
    for (let i = 0; i <= Math.ceil(allVideogames/videogamesPerPage); i++){
        pageNumber.push(i+1)
    }
    return (
        <nav>
            <div className={styles.numbers}>
            <ul>
                {pageNumber &&
                pageNumber.map(number => (
                    <a onClick={() => paginate(number)}>{number}</a>
                ))}
            </ul>
            </div>
        </nav>
    )
}

export default Paginate