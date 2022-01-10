const router = require('express').Router();
const sequelize = require('../config/connection');

router.get('/', (req, res) => {
    res.render('home', {})
})

router.get('/info', (req, res) => {
    res.render('info', {})
})

router.get('/signup', (req, res) => {
    res.render('signup', {});
});

router.get('/login', (req, res) => {
    res.render('login', {});
});

module.exports = router;