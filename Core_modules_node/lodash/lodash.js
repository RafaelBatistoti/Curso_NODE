const lodash = require("lodash");

const a = [1, 3, 5, 8];
const b = [1, 32, 58, 8];

const diff = lodash.difference(a, b);
const dif = lodash.difference(b, a);

console.log(diff, dif);
