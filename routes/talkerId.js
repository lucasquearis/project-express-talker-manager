const fs = require('fs');

const data = JSON.parse(fs.readFileSync('./talker.json', 'utf-8'));
const HTTP_OK_STATUS = 200;

module.exports = (req, res) => {
  const { id: identificador } = req.params;
  const filteredTalker = data.find(({ id }) => id === parseInt(identificador, 10));
  if (!filteredTalker) {
    return res
    .status(404)
    .send({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(HTTP_OK_STATUS).json(filteredTalker);
};
