import express from 'express';
import routerTest from './controllers/router';
import cors from 'cors';
import userRouter from './controllers/user';
import dotenv from 'dotenv';
// import { loggerMiddleware } from './utils/middleware';
import morgan from 'morgan';
import loginRouter from './controllers/login';

dotenv.config();

const PORT = process.env.PORT || 3001;


const app = express();
app.use(express.static('frontend/dist'));
app.use(morgan('tiny'));
app.use(express.json());


app.use(cors());
app.use('/api', routerTest);
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
app.use('/api/user', userRouter);
app.use('/api/login', loginRouter);
app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});





