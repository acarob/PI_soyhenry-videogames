import React, { useState, useEffect } from "react"; //creo un componente funcional.
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createVideogame, getGenres } from "../../redux/actions";
import Navbar from "../navbar/Navbar";
import styles from "./Form.module.css"

function validate (input) {
    let errors = {};
    if (!input.name) {
        errors.name = "A name is required.";
    } else if (!input.description) {
        errors.description = "A description is required.";
    }else if (!input.released) {
        errors.released = "Please, enter a date of released."
    }
    return errors;
}

const Form = () =>  {
    const history = useHistory()
    const dispatch = useDispatch()
    const genres = useSelector((state) => state.genres)
    const [errors, setErrors] = useState({})
    
    const [input, setInput] = useState({
        name: "",
        description: "",
        released: "",
        rating: "",
        platforms: [],
        genres: []
    })

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
        // console.log(input)
    }

    const handleSelect2 = (e) => {
        setInput({
            ...input,
            platforms: [...input.platforms, e.target.value]
        })
    }

    const handleSelect = (e) => {
        setInput({
            ...input,
            genres: [...input.genres, e.target.value]
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(input)
        dispatch(createVideogame(input))
        alert("videogame successfully created!")
        setInput({
            name: "",
            description: "",
            released: "",
            rating: "",
            platforms: [],
            genres: []
        })
        history.push('/home')
    }

    const handleDeletePlatforms = (el) => {
        setInput({
            ...input,
            platforms: input.platforms.filter(e => e !== el)
        })
    }

    const handleDeleteGenres = (el) => {
        setInput({
            ...input,
            genres: input.genres.filter(e => e !== el)
        })
    }

    useEffect(() => {
        dispatch (getGenres());
    }, [dispatch])

    const plat = ['PC', 'PlayStation 5', 'PlayStation 4', 'Xbox One', 'Xbox Series S/X', 'Nintendo Switch', 'iOS', 'Android', 'Nintendo 3DS', 'Nintendo DS', 'Nintendo DSi', 'macOS', 'Linux', 'Xbox 360', 'Xbox', 'PlayStation 3', 'PlayStation 2', 'PlayStation', 'PS Vita', 'PSP', 'Wii U', 'Wii', 'GameCube', 'Nintendo 64', 'Game Boy Advance', 'Game Boy Color', 'Game Boy', 'SNES', 'NES', 'Classic Macintosh', 'Apple II', 'Commodore / Amiga', 'Atari 7800', 'Atari 5200', 'Atari 2600', 'Atari Flashback', 'Atari 8-bit', 'Atari ST', 'Atari Lynx', 'Atari XEGS', 'Genesis', 'SEGA Saturn', 'SEGA CD', 'SEGA 32X', 'SEGA Master System', 'Dreamcast', '3DO', 'Jaguar', 'Game Gear', 'Neo Geo', 'Web'];
    
    return (
        <div className={styles.back}>
            <div>
                <Navbar/>
            </div>
            <div className={styles.form}>
            <h3>Create your videogame</h3>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <div>
                    <label>Name: </label>
                    <input
                    type= "text"
                    value= {input.name}
                    name= "name"
                    onChange={(e)=>handleChange(e)}
                    />
                    {errors.name && (
                        <p className="error">{errors.name}</p>
                    )}
                </div>
                <div>
                    <label>Description: </label>
                    <textarea
                    type= "text"
                    value= {input.description}
                    name= "description"
                    onChange={(e)=>handleChange(e)}
                    />
                    {errors.description && (
                        <p className="error">{errors.description}</p>
                    )}
                </div>
                <div>
                    <label>Released: </label>
                    <input
                    type= "date"
                    value= {input.released}
                    name= "released"
                    onChange={handleChange}
                    />
                    {errors.released && (
                        <p className="error">{errors.released}</p>
                    )}
                </div>
                <div>
                    <label>Rating: </label>
                    <input
                    type= "number"
                    min= "1"
                    max= "5"
                    value= {input.rating}
                    name= "rating"
                    onChange={(e)=>handleChange(e)}
                    />
                </div>
                <div>
                    <label>Image: </label>
                    <input
                    type= "url"
                    value= {input.img}
                    name= "image"
                    onChange={(e)=>handleChange(e)}
                    />
                </div>
                <div>
                    <label>Platforms: </label>
                    <select onChange={(e) => handleSelect2(e)}>
                        {plat.map((e) => (
                            <option value={e}>{e}</option>
                        ))}
                    </select>
                    {/* <ul>{input.platforms.map(el => el)}</ul> */}
                    {input.platforms.map(el =>
                <div className="divPla">
                    <p className={styles.list}>{el}</p>
                    <button className="botonX" onClick={(e) => handleDeletePlatforms(el)}>X</button>
                </div>
                )}
                </div>
                <div>
                    <label>Genres: </label>
                    <select onChange={(e) => handleSelect(e)}>
                        {genres.map((e) => (
                            <option value={e.name}>{e.name}</option>
                        ))}
                    </select>
                    {/* <ul>{input.genres.map(el => el)}</ul> */}
                   {input.genres.map(el =>
                    <div className="divGen">
                        <p className={styles.list}>{el}</p>
                        <button className="botonX" onClick={(e) => handleDeleteGenres(el)}>X</button>
                    </div>
                    )}
                </div>
                <button type= "submit">Create videogame</button>
            </form>
            </div>
        </div>
    )
}

export default Form;