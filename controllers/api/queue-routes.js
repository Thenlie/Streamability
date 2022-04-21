const router = require('express').Router();
const { Queue } = require('../../models');

router.get('/:user_id', async (req, res) => {
    try {
        const response = await Queue.findAll({
            where: { user_id: req.params.user_id }
        });
        if (!response) {
            res.status(204).json({ message: 'No shows found!' });
        }
        res.json(response);
    } catch (err) {
        res.status(500).json(err);
    }   
});
router.post('/', async (req, res) => {
    try {
        const response = await Queue.create({
            show_id: req.body.showId,
            show_title: req.body.showTitle,
            show_img: req.body.showImg,
            user_id: req.session.user_id
        });
        res.json(response);
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }   
});
router.delete('/:id', async (req, res) => {
    try {
        const response = await Queue.destroy({
            where: { id: req.params.id, user_id: req.session.user_id }
        });
        res.json(response);
    } catch (err) {
        res.status(500).json(err);
    }   
});

module.exports = router;