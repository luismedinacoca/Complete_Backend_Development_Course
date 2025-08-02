const fs = require('fs');
const path = require('path');

const dataFolder = path.join(__dirname, "data");

// if it does not exist, create it:
if(!fs.existsSync(dataFolder)){
  fs.mkdirSync(dataFolder);
  console.log("data folder created");
}

const filePath = path.join(dataFolder, 'example.txt')


/****************************** Sync way of creating a file: ******************************/
fs.writeFileSync(filePath, 'Hello form Node Js')
console.log("File created successfully");

const readContentFromFile = fs.readFileSync(filePath, 'utf-8')
console.log('👉🏽 👉🏽 File content:', readContentFromFile);

fs.appendFileSync(filePath, '\nThis is a new line added to that file!');
console.log('new file content added: ', )
// const readContentFromFile01 = fs.readFileSync(filePath, 'utf-8')
// console.log('👉🏽 👉🏽 File content:', readContentFromFile01);


/****************************** Async way of creating a file: ******************************/
const asyncFilePath = path.join(dataFolder, 'async-example.txt');
fs.writeFile(asyncFilePath, 'Hello, Async node JS 💥 💣', (err) => {
  if(err) throw err;
  console.log("Async file is created successfully");

  fs.readFile(asyncFilePath, 'utf-8', (err, data) => {
    if(err) throw err;
    console.log("👀 Async file content: ", data);

    fs.appendFile(asyncFilePath, '\nThis is a new line added to this async file ✅ ✅', (err) => {
      if(err) throw err;
      console.log('New line addedd to the async file successfully');

      fs.readFile(asyncFilePath, 'utf-8', (err, data) => {
        if(err) throw err;
        console.log("👀 Async file content: ", data);
      })
    })
  })
})