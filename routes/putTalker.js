const fs = require('fs');

module.exports = async (req, res) => {
  const { id } = req.params;
  const talkers = JSON.parse(await fs.readFileSync('./talker.json', 'utf-8'));
  const input = { id: +id, ...req.body };
  const filteredTalker = talkers.filter((response) => response.id !== +id);
  const resultado = [...filteredTalker, input];
  fs.writeFileSync('./talker.json', JSON.stringify(resultado));
  res.status(200).json(input);
};
