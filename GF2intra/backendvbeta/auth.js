
const express = require('express');
const router = express.Router();

const Users = [];

Users.push({username: 'admin', password: 'admin', token: -1});
Users.push({username: 'simon', password: '1234', token: -1});
Users.push({username: 'guest', password: 'abc', token: -1});




router.post('/login', async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        if(Users.find(user => user.username === username && user.password === password)) {
            const token = Math.floor(Math.random() * 1000000);
            const user = Users.findIndex(user => user.username === username && user.password === password);
            user.token = token
            res.json({err: false, token: token});
        } else {
            res.json({err: true, msg: 'No user'}).status(400);
        }
    } catch(err) {
        res.json({err: true, msg: err}).status(400);
    }
});











module.exports = router;
