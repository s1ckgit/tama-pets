// eslint-disable-next-line @typescript-eslint/no-var-requires
const rl = require('readline');

const readline = rl.createInterface({ input: process.stdin, output: process.stdout });

const artW = 145;
const artH = 173;

const boardcenterX = Math.floor(artW / 2);
const boadrcenterY = Math.floor(artH / 2);

console.log('x y width heigth');

readline.on('line', (line) => {
  const [x, y, width, height] = line.split(' ').map((item) => +item);
  console.log('x', x + width / 2 - boardcenterX);
  console.log('y', y + height / 2 - boadrcenterY);
});

