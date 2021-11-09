const express = require('express');
const talker = require('./routes/talker');
const talkerId = require('./routes/talkerId');
const auth = require('./middlewares/auth');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.get('/talker', talker);

app.get('/talker/:id', talkerId);

app.post('/login', auth);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
