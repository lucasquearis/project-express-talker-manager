const fs = require('fs').promises;

module.exports = async (_req, res) => {
  const data = JSON.parse(await fs.readFile('./talker.json', 'utf-8'));
  const HTTP_OK_STATUS = 200;
  if (!data) return res.status(HTTP_OK_STATUS).send([]);
   res.status(HTTP_OK_STATUS).json(data);
};
