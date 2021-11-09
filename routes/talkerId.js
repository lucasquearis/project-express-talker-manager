const fs = require('fs');

module.exports = async (req, res) => {
  const data = JSON.parse(await fs.readFileSync('./talker.json', 'utf-8'));
  const HTTP_OK_STATUS = 200;
  const { id: identificador } = req.params;
  const filteredTalker = data.find(({ id }) => id === +identificador);
  if (!filteredTalker) {
    return res
    .status(404)
    .send({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(HTTP_OK_STATUS).json(filteredTalker);
};
