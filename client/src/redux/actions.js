import axios from "axios";

export const GET_VIDEOGAME_BY_NAME = "GET_VIDEOGAME_BY_NAME";
export const GET_ALL_VIDEOGAMES = "GET_ALL_VIDEOGAMES";
export const GET_VIDEOGAME_BY_ID = "GET_VIDEOGAME_BY_ID";
export const CREATE_VIDEOGAME = "CREATE_VIDEOGAME";
export const GET_GENRES = "GET_GENRES";
export const FILTER_CREATED = "FILTER_CREATED";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_RATING = "ORDER_BY_RATING";

export const getVideogameByName = (name) => async dispatch => {
    try {
        const json = await axios.get(`http://localhost:3001/videogames?name=${name}`);
        return dispatch ({
            type: GET_VIDEOGAME_BY_NAME, payload: json.data
        })
    } catch (error) {
        console.log(error)
    }
}

export const getAllVideogames = () => async dispatch => {
    try {
        const json = await axios.get("http://localhost:3001/videogames");
        return dispatch ({
            type: GET_ALL_VIDEOGAMES, payload: json.data
        })
    } catch (error) {
        console.log(error)
    }
}

export const getVideogameById = (id) => async dispatch => {
    return await fetch(`http://localhost:3001/videogame/${id}`)
    .then (response => response.json())
    .then (data => {
        dispatch ({
            type: GET_VIDEOGAME_BY_ID, payload: data
        })
    })
}

export const createVideogame = (payload) => async dispatch => {
    try {
        const json = await axios.post('http://localhost:3001/videogames',payload) //lo paso por body
        return dispatch ({
            type: CREATE_VIDEOGAME, payload: json.data
        })
    } catch (error){
        console.log(error)
    }
}

export const getGenres = () => async dispatch => {
    try {
        const json = await axios.get('http://localhost:3001/genres')
        return dispatch ({
            type: GET_GENRES, payload: json.data
        })
    } catch (error) {
        console.log(error)
    }
}

export function filterCreated(payload) {     
    return {         
        type: 'FILTER_CREATED',         
        payload     
    } 
}

export const orderByName = (payload) => {
    return { 
        type: ORDER_BY_NAME, 
        payload
    };
}

export const orderByRating = (payload) => {
    return {
        type: ORDER_BY_RATING,
        payload
    }
}