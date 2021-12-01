const express = require('express');
const cors_proxy = require('cors-anywhere');
const path = require('path');
const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended:true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

cors_proxy.createServer({
    originWhitelist: [],
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2']
}).listen(PORT, HOST, () => {
    console.log(`Server running on port ${PORT}`);
});