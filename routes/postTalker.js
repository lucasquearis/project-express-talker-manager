const fs = require('fs/promises');

module.exports = async (req, res) => {
  const talkers = JSON.parse(await fs.readFile('./talker.json', 'utf-8'));
  const input = req.body;
  const inputWithId = { id: (talkers.length + 1), ...input };
  const resultado = [...talkers, inputWithId];
  fs.writeFile('./talker.json', JSON.stringify(resultado))
    .then(() => console.log('Arquivo escrito com sucesso"'))
    .catch((err) => console.error(`Erro ao escrever o arquivo: ${err.message}`));
  return res.status(201).json(inputWithId);
};
