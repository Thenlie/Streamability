const router = require('express').Router();
const fetch = require('node-fetch');

router.get('/', (req, res) => {
    // modal fetch
    // load queue
    res.render('home', { loggedIn: req.session.loggedIn })
})

router.get('/info/:type/:title/:id', async (req, res) => {
    const infoRes = await fetch(`https://api.themoviedb.org/3/${req.params.type}/${req.params.id}?api_key=${process.env.MOVIEDB_KEY}`);
    const watchRes = await fetch(`https://api.themoviedb.org/3/${req.params.type}/${req.params.id}/watch/providers?api_key=${process.env.MOVIEDB_KEY}`);
    const suggestionRes = await fetch(`https://hidden-retreat-58836.herokuapp.com/https://tastedive.com/api/similar?q=${req.params.title}&type=${req.params.type}&limit=5&info=1&k=${process.env.TASTEDIVE_KEY}`, { headers: {"X-Requested-With": "XMLHttpRequest"}});
    const queueRes = await fetch(`http://localhost:3001/api/queue/${req.session.user_id}`);

    const info = await infoRes.json();
    const watchProviders = await watchRes.json();
    const suggestions = await suggestionRes.json();
    const queue = await queueRes.json();
    const providers = watchProviders.results.US.flatrate;
    res.render('info', { info, providers, suggestions, queue, loggedIn: req.session.loggedIn })
})

router.get('/signup', (req, res) => {
    res.render('signup', {});
});

router.get('/login', (req, res) => {
    res.render('login', {});
});

module.exports = router;