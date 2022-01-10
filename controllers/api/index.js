const router = require('express').Router();
const userRoutes = require('./user-routes');

router.use('/user', userRoutes);

router.use((req, res) => {
    res.redirect('/');
});

module.exports = router;