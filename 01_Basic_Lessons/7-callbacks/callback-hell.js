const fs = require('fs');

// Paso 1: Leer archivo original
fs.readFile('input.txt', 'utf-8', (err, data) => {
  if(err){
    console.log(`Error reading file:`, err);
    return;
  } 

  console.log("✅ input.txt leído correctamente");
  const modifyFileData = data.toUpperCase();

  // Paso 2: Escribir nuevo archivo
  fs.writeFile('output.txt', modifyFileData, (err) => {
    if(err){
      console.error("🔥 Error writing file", err);
      return;
    }
    console.log("✏️ Data written to the new file");

    // Paso 3: Leer el archivo recién creado
    fs.readFile('output.txt', 'utf-8', (err, newData) => {
      if(err){
        console.error('🔥 Error reading file', err);
        return;
      }

      console.log("📖 Contenido de output.txt:");
      console.log("--------------------------------");
      console.log(newData);
      console.log("--------------------------------");

      // Paso 4: Bonus - Eliminar el archivo después de 3 segundos
      setTimeout(() => {
        fs.unlink('output.txt', (err) => {
          if(err) {
            console.error("🔥 Error eliminando output.txt:", err);
            return;
          }
          console.log("🗑️ output.txt eliminado!");
        });
      }, 3000);
    });
  });
});

console.log("🚀 Iniciando proceso de callback hell...");