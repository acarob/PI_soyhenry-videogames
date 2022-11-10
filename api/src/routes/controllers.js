require('dotenv').config();
const { YOUR_API_KEY } = process.env;
const axios = require('axios');

const getHome = async () => {
    let urls = [];
    for(let i=1; i<=5; i++){
        urls = [
            ...urls,
            `https://api.rawg.io/api/games?key=${YOUR_API_KEY}&page=${i}`
        ]
    }
    let api = urls.map((e) => axios.get(e));

    api = await Promise.all(api);

    api = api?.map((e) => e.data.results).flat();

    api = api?.map((e) => {
        return {
            id: e.id,
            name: e.name,
            genres: e.genres?.map((e) => e.name), 
            platforms: e.platforms?.map((e) => e.platform.name),
            released: e.released,
            img: e.background_image,
            rating: e.rating,
        };
    })
    return api;
}

module.exports = { getHome };