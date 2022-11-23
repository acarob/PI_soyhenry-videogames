import { GET_ALL_VIDEOGAMES, GET_VIDEOGAME_BY_ID, CREATE_VIDEOGAME, GET_VIDEOGAME_BY_NAME, GET_GENRES, FILTER_CREATED, ORDER_BY_NAME, ORDER_BY_RATING } from "./actions";

const initialState = {
    videogames: [],
    videogameDetail: {},
    genres: [],
    filtered: [],
    filtered2: [],
    // allVideogames: []
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_VIDEOGAMES:
            return {
                ...state,
                videogames: action.payload,
                // allVideogames: action.payload,
                filtered: action.payload,
                filtered2: action.payload
            }
        case GET_VIDEOGAME_BY_ID:
            return {
                ...state,
                videogameDetail: action.payload,
            }
        case CREATE_VIDEOGAME:
            return {
                ...state,
                videogames: [...state.videogames, action.payload]
            }
        case GET_GENRES: 
            return {
                ...state,
                genres: action.payload
            }
        case GET_VIDEOGAME_BY_NAME:
            return {
                ...state,
                // videogames: action.payload,
                filtered: action.payload,
                filtered2: action.payload
            }
        case FILTER_CREATED:
            let inDb = state.filtered2.filter(e => e.createdDb === true)
            let inApi = state.filtered2.filter(e => !e.createdDb);
            let all = [...inApi,...inDb]
            // console.log(inDb, inApi, all)
            return {
                ...state,
                filtered: action.payload === "all"? all: action.payload === "videogamesDb"? inDb: inApi
            }
        case ORDER_BY_NAME:
            let sortedArray = action.payload === "az"?
            state.filtered.sort(function(a, b) {
                if (a.name > b.name) {
                    return 1;
                }
                if (b.name > a.name) {
                    return -1;
                }
                return 0;
            }) 
            : action.payload === "za"?
            state.filtered.sort(function(a, b) {
                if (a.name > b.name){
                    return -1;
                }
                if (b.name > a.name){
                    return 1;
                }
                return 0;
            })
            : [...state.videogames];
            return {
                ...state,
                filtered: sortedArray,
                filtered2: sortedArray,
            };
        case ORDER_BY_RATING:
            let sortedArray2 = action.payload === "min"?
            state.filtered.sort(function(a, b) {
                if (a.rating > b.rating) {
                    return 1;
                }
                if (b.rating > a.rating) {
                    return -1;
                }
                return 0;
            }) 
            : action.payload === "max"?
            state.filtered.sort(function(a, b) {
                if (a.rating > b.rating){
                    return -1;
                }
                if (b.rating > a.rating){
                    return 1;
                }
                return 0;
            })
            : [...state.videogames];
            return {
                ...state,
                filtered: sortedArray2,
                filtered2: sortedArray2,
            };
        default:
            return {
                ...state
            }
    }
}

export default rootReducer;