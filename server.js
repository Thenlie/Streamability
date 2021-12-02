const express = require('express');
const cors = require('cors');
const path = require('path');
// const cors_proxy = require('cors-anywhere');
// const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || 3001;
const app = express();

// "https://streamability.herokuapp.com/"

app.use(cors({ origin: true, credentials: true }));
app.use(express.urlencoded({ extended:true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

// cors_proxy.createServer({
//     originWhitelist: [],
//     requireHeader: ['origin', 'x-requested-with'],
//     removeHeaders: ['cookie', 'cookie2']
// })

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});