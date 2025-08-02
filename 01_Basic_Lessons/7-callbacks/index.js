const fs = require('fs');

// Callback hell:
/*
setTimeout(() => {
  console.log("1 second passed");
  setTimeout(() => {
    console.log("2 seconds passed");
    setTimeout(() => {
      console.log("3 seconds passed");
    }, 1000);
  }, 1000);
}, 1000);
*/

function person(name, callbackFn){
  console.log(`Hello ${name}`);
  callbackFn();
}

function address(){
  console.log("Address: 123 Main St - Mendoza");
}

person('Luiggie', address)


//async reading file:
fs.readFile('input.txt', 'utf-8', (err, data) => {
  if(err){
    console.log(`Error reading file:`, err);
    return;
  } 
  console.log(data);
})
