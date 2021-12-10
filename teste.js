const fs = require('fs');

const data = JSON.parse(fs.readFileSync('./talker.json', 'utf-8'));

console.log(data.find(({ id }) => id === 4));
