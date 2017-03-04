import express from 'express';
import morgan from 'morgan';
import { join } from 'path';

const app = express();

app.use(morgan('dev'));

app.get('/api', (req, res) => {
  res.status(200).json({
    games: [
      {
        name: 'Dota'
      },
      {
        name: 'Counter Strike'
      }
    ]
  });
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('dist'));

  app.get('*', (req, res) => {
    res.sendFile(join(__dirname, '../dist/index.html'));
  });
}


app.listen(process.env.PORT || 3000, () => {
  console.log('Listennng');
});
