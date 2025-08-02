const lodash = require('lodash');

const names = ['luiggie', 'carmen', 'gastón', 'estela', 'bruno', 'charo'];
const capitalize = lodash.map(names, lodash.capitalize)

console.log(capitalize);