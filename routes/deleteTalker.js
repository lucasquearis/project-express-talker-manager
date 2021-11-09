const fs = require('fs/promises');

module.exports = async (req, res) => {
  const { id } = req.params;
  const talkers = JSON.parse(await fs.readFile('./talker.json', 'utf-8'));
  const filteredTalkers = talkers.filter((response) => response.id !== +id);
  fs.writeFile('./talker.json', JSON.stringify(filteredTalkers))
    .then(() => console.log('Arquivo escrito com sucesso"'))
    .catch((err) => console.error(`Erro ao escrever o arquivo: ${err.message}`));
  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
};
