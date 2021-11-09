const fs = require('fs');

module.exports = async (req, res) => {
  const talkers = JSON.parse(await fs.readFileSync('./talker.json', 'utf-8'));
  const input = req.body;
  const inputWithId = { id: (talkers.length + 1), ...input };
  const resultado = [...talkers, inputWithId];
  fs.writeFileSync('./talker.json', JSON.stringify(resultado));
  return res.status(201).json(inputWithId);
};
