const { Router } = require ('express');
const { getHome } = require ('./controllers')
const router = Router();

router.get('/', async (req, res) => {
    const { name } = req.query; //terminar esta parte
    try {
        const result = await getHome();
        res.send(result)
    } catch (error) {
        res.status(404).send(error)
    }
}) 

module.exports = router;