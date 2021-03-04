
const express = require('express');
const cors = require('cors');

const auth = require('./auth');




const app = express();
const port = 80;
app.use(express.urlencoded({extended: true}));
app.use(express.json({}));
app.use(cors());



app.use('/auth', auth);

app.get('/', async (req, res) => {
    res.send('<h1>HelloThere</h1>').status(200);
});








app.listen(port, () => {
    console.log('Express on port', port);
});
