const express = require('express');
const fs = require('fs/promises');
const talker = require('./routes/talker');
const talkerId = require('./routes/talkerId');
const auth = require('./middlewares/auth');
const postTalker = require('./routes/postTalker');
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
    postTalker,
);

app.put(
  '/talker/:id',
  validToken,
  validName,
  validAge,
  validTalk,
  validTalkObject,
  async (req, res) => {
    const { id } = req.params;
    const talkers = JSON.parse(await fs.readFile('./talker.json', 'utf-8'));
    const input = { id: +id, ...req.body };
    const filteredTalker = talkers.filter((response) => response.id !== +id);
    const resultado = [...filteredTalker, input];
    fs.writeFile('./talker.json', JSON.stringify(resultado))
      .then(() => console.log('Arquivo escrito com sucesso"'))
      .catch((err) => console.error(`Erro ao escrever o arquivo: ${err.message}`));
    res.status(200).json(input);
  },
);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
