import express from 'express';
import routerTest from './controllers/router';
import cors from 'cors';

const PORT = 3001;

const requestLogger = (request: { method: any; path: any; body: any; }, _response: any, next: () => void) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const app = express();
app.use(requestLogger)
app.use(express.json());
app.use(requestLogger)


app.use(cors());
app.use('/api', routerTest);
app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});





