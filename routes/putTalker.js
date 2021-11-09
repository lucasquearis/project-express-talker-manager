const fs = require('fs/promises');

module.exports = async (req, res) => {
  const { id } = req.params;
  const talkers = JSON.parse(await fs.readFile('./talker.json', 'utf-8'));
  const input = { id: +id, ...req.body };
  const filteredTalker = talkers.filter((response) => response.id !== +id);
  const resultado = [...filteredTalker, input];
  fs.writeFile('./talker.json', JSON.stringify(resultado))
    .then(() => console.log('Arquivo escrito com sucesso"'))
    .catch((err) => console.error(`Erro ao escrever o arquivo: ${err.message}`));
  res.status(200).json(input);
};
