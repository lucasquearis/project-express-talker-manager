const validToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
  if (authorization.length !== 16) return res.status(401).json({ message: 'Token inválido' });
  next();
};

const validName = async (req, res, next) => {
  const { name } = await req.body;
  if (!name || name === '') {
    return res
    .status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res
    .status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const validAge = async (req, res, next) => {
  const { age } = await req.body;
  if (!age || age === '') {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const validTalk = async (req, res, next) => {
  const { talk } = await req.body;
  if (!talk || !talk.watchedAt || typeof talk.rate === 'undefined') {
    return res.status(400)
      .json(
        { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
        );
  }
  next();
};

const validTalkObject = async (req, res, next) => {
  const { talk: { watchedAt, rate } } = await req.body;
  const regexData = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
  const regexOneToFive = /^[1-5]/;
  if (!regexData.test(watchedAt) || !watchedAt) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (!regexOneToFive.test(rate) || !rate) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

module.exports = { validToken, validName, validAge, validTalk, validTalkObject };