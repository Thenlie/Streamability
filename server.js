const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();

require('dotenv').config();
console.log(process.env);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
