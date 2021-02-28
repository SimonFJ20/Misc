import express from 'express';
import { User, UserResponse } from './models';
const router = express.Router();

const makeid = (length: number): string => {
    let id = "";
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++) {
        id += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return id;
};

const activeUsers: {username: string, password: string, token: string}[] = [];

router.post('/login', async (req, res) => {
    
    try {
        const user = <User> req.body;

        console.log('User', user.username);

        const token = makeid(32);

        activeUsers.push({username: user.username, password: user.password, token: token});

        const response: UserResponse = {
            username: user.username, 
            token: token,
            error: false
        }

        res.json(response).status(200);
    }catch(err) {

        const response: UserResponse = {
            username: '', 
            token: '',
            error: true,
            errmsg: err
        }

        res.json(response).status(400);
    }

});





export default router;
