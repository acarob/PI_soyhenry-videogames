const { Router } = require ('express');
// const { Videogame, Genre } = require('../db.js');
const { getVideogamesById } = require ('./controllers')
const router = Router();

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        // if (id) {
            const gamesById = await getVideogamesById(id);
            res.send(gamesById)
        // }
    } catch (error) {
        res.status(404).send(error);
    }
})

module.exports = router;