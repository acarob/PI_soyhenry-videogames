const { Router } = require ('express');
const { Videogame, Genre } = require('../db.js');
const { getHome, getVideogamesByName, getVideogamesById } = require ('./controllers')
const router = Router();

router.get('/', async (req, res) => {
    const { name } = req.query;
    try {
        if (name) {
            const resultGames = await getVideogamesByName(name);
            res.send(resultGames)
        } else {
            const result = await getHome();
            res.send(result)
        }
    } catch (error) {
        res.status(404).send(error)
    }
});

router.post('/', async (req, res) => {
    try {
        const { name, description, release, rating, platforms, genres, img } = req.body;
        let game = await Videogame.create({ name, description, release, rating, platforms: platforms.split(' '), img });
        let db = await Genre.findAll({
            where: {
              name: genres,
            },
          });   
          await game.addGenres(db);
        res.status(201).send("Game successfully created.");
    } catch (error) {
        res.status(400).send({error:error.message});
    }  
});

module.exports = router;