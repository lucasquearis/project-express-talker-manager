const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const data = JSON.parse(fs.readFileSync('./talker.json', 'utf-8'));

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.get('/talker', (req, res) => {
  if (!data) return res.status(HTTP_OK_STATUS).send([]);
  return res.status(HTTP_OK_STATUS).json(data);
});

app.get('/talker/:id', (req, res) => {
  const { id: identificador } = req.params;
  const filteredTalker = data.find(({ id }) => id === parseInt(identificador, 10));
  if (!filteredTalker) {
    return res
    .status(404)
    .send({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(HTTP_OK_STATUS).json(filteredTalker);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
