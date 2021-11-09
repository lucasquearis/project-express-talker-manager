const express = require('express');
const fs = require('fs/promises');
const talker = require('./routes/talker');
const talkerId = require('./routes/talkerId');
const auth = require('./middlewares/auth');
const 
{ 
  validToken,
  validName,
  validAge,
  validTalk,
  validTalkObject,
} = require('./middlewares/validator');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.get('/talker', talker);

app.get('/talker/:id', talkerId);

app.post('/login', auth);

app.post(
    '/talker',
    validToken,
    validName,
    validAge,
    validTalk,
    validTalkObject,
    async (req, res) => {
      const talkers = JSON.parse(await fs.readFile('./talker.json', 'utf-8'));
      const input = req.body;
      const inputWithId = { id: (talkers.length + 1), ...input };
      const resultado = [...talkers, inputWithId];
      fs.writeFile('./talker.json', JSON.stringify(resultado))
        .then(() => console.log('Arquivo escrito com sucesso"'))
        .catch((err) => console.error(`Erro ao escrever o arquivo: ${err.message}`));
      return res.status(201).json(inputWithId);
    },
);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
