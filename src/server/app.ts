import cors from 'cors';
import express from 'express'
import morgan from 'morgan';
import { checkListRouter } from '../router/router.check.list.js';

export const app = express();

app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.static('public'));

app.use('/knowledge', checkListRouter);
