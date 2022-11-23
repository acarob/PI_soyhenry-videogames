require('dotenv').config();
const { YOUR_API_KEY_2 } = process.env;
const axios = require('axios');
const { Videogame, Genre } = require('../db.js');

const getHome = async () => {
    try {
        let urls = [];
        for(let i=1; i<=5; i++){
            urls = [
                ...urls,
                `https://api.rawg.io/api/games?key=${YOUR_API_KEY_2}&page=${i}`
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
        });
        
        let videogamesDb = await Videogame.findAll({
            include: {
              model: Genre,
              attributes: ["name"],
              through: {
                attributes: [],
              },
            },
          });
          // console.log(videogamesDb)
          videogamesDb = videogamesDb?.map((e) => {
            return {
              id: e.id,
              name: e.name,
              // genres: e.genres?.map((e) => e.name),
              platforms: e.platforms,
              released: e.released,
              img: e.img,
              rating: e.rating,
              description: e.description,
              createdDb: e.createdDb
            };
          });
      
          api = [...api, ...videogamesDb];
      
          return api;
        
    } catch (error) {
        throw new Error("Cannot get videogames.");
    }
}

const getVideogamesByName = async (name) => {
  let gamesByName = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${YOUR_API_KEY_2}`)
  gamesByName = gamesByName.data.results;
  if (gamesByName.length){
    gamesByName = gamesByName.splice(0, 15);
    gamesByName = gamesByName.map(e => {
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
  }
  return gamesByName;
}

const getVideogamesById = async (id) => {
  if (id.includes('-')){
    const found = await Videogame.findByPk(id);
    return found;
  }else {
  let gamesById = await axios.get(`https://api.rawg.io/api/games/${id}?key=${YOUR_API_KEY_2}`)
  gamesById = gamesById.data;
  const gameDone = {
      id: gamesById.id,
      name: gamesById.name,
      genres: gamesById.genres?.map((e) => e.name), 
      platforms: gamesById.platforms?.map((e) => e.platform.name),
      released: gamesById.released,
      img: gamesById.background_image,
      rating: gamesById.rating,
      description: gamesById.description
    };
  return gameDone;
  }
}

const getGenres = async () => {
  let genres = await axios.get(`https://api.rawg.io/api/genres?key=${YOUR_API_KEY_2}`)
  genres = genres.data.results;
  genres = genres.map((e) => {
    return {
      name: e.name,
    }
  })
  genres.forEach( async (e) => {
    await Genre.findOrCreate({
      where : {
        name: e.name,
      }
    })
  });
  let genresDb = await Genre.findAll();
  return genresDb;
}

module.exports = { getHome, getVideogamesByName, getVideogamesById, getGenres };