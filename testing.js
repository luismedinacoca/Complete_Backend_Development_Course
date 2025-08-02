const myArray = [
  'playwright-pw-api-plugin',
  'playwright-mcp-server',
  'playwright-pycon',
  'playwright-cucumber-starter',
  'playwright-accessibility',
  'playwright-test',
  'playwright-udemy',
  'playwright-python-test-framework',
  'cypress-playwright-webkit'
];

const palabraBuscada = "playwright";
const contienePalabra = myArray.some(item => item.includes(palabraBuscada));
console.log("contienePalabra: ", contienePalabra); 