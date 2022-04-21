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
    const suggestionRes = await  fetch(`https://api.themoviedb.org/3/${req.params.type}/${req.params.id}/recommendations?api_key=${process.env.MOVIEDB_KEY}&limit=5`);
    const queueRes = await fetch(`http://localhost:3001/api/queue/${req.session.user_id}`);

    const info = await infoRes.json();
    const watchProviders = await watchRes.json();
    const suggestionData = await suggestionRes.json();
    const queue = await queueRes.json();
    const providers = watchProviders.results.US.flatrate;
    let suggestions = [];
    for (let i = 0; i < 5; i++) {
        suggestions.push(suggestionData.results[i]);
    };
    res.render('info', { info, providers, suggestions, queue, loggedIn: req.session.loggedIn })
})

router.get('/signup', (req, res) => {
    res.render('signup', {});
});

router.get('/login', (req, res) => {
    res.render('login', {});
});

module.exports = router;