const router = require('express').Router();
const userRoutes = require('./user-routes');
const queueRoutes = require('./queue-routes');

router.use('/user', userRoutes);
router.use('/queue', queueRoutes);

router.use((req, res) => {
    res.redirect('/');
});

module.exports = router;