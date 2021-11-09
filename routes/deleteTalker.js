const fs = require('fs');

module.exports = async (req, res) => {
  const { id } = req.params;
  const talkers = JSON.parse(await fs.readFileSync('./talker.json', 'utf-8'));
  const filteredTalkers = talkers.filter((response) => response.id !== +id);
  fs.writeFileSync('./talker.json', JSON.stringify(filteredTalkers));
  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
};
