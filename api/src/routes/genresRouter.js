const { Router } = require ('express');
const { getGenres } = require('./controllers');
const router = Router();

//Revisar lo siguiente:
router.get("/", async (req, res) => {
    try {
        const allGenres = await getGenres();
        res.send(allGenres);
    } catch (error) {
        res.status(404).send(error);
    }
});

module.exports = router;