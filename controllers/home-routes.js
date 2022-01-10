const router = require('express').Router();
const sequelize = require('../config/connection');
const { User } = require('../models');

router.get('/', (req, res) => {
    res.render('home', {})
})

router.get('/signup', (req, res) => {
    res.render('signup', {});
});

router.get('/login', (req, res) => {
    res.render('login', {});
});

module.exports = router;