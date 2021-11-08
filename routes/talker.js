const fs = require('fs');

const data = JSON.parse(fs.readFileSync('./talker.json', 'utf-8'));
const HTTP_OK_STATUS = 200;

module.exports = (req, res) => {
  if (!data) return res.status(HTTP_OK_STATUS).send([]);
  return res.status(HTTP_OK_STATUS).json(data);
};
