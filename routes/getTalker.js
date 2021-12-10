const fs = require('fs');

module.exports = async (req, res) => {
  const { q } = req.query;
  const talkers = JSON.parse(await fs.readFileSync('./talker.json', 'utf-8'));
  const filteredTalkers = talkers.filter(({ name }) => name.includes(q));
  if (!q) return res.status(200).json(talkers);
  res.status(200).json(filteredTalkers);
};
