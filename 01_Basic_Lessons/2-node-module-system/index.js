// module.exports -> export
// require -> import

const firstModule = require('./first-module');

console.log(firstModule.add(14, 100));
console.log(firstModule.sub(14, 100));
console.log(firstModule.div(140, 10));

try {
  console.log("trying to divide by zero");
  let result = firstModule.div(0,20);
  console.log(result);
} catch (error) {
  console.log("Caught an error: ", error);
}
