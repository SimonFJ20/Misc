import express from 'express';
import cors from 'cors';
import path from 'path';

import api from './api';


const server = express();
const port = 80;
server.use(cors());
server.use(express.json());

server.use('/api/', api);
server.use(express.static(path.join(__dirname, '../myApp1/dist')))

server.listen(port, () => {
    console.log('Express on', port);
    //pifan.init(500, 30, 41, false, true);
    //piled.init();
});
