const path = require('path');

console.log("➡️ Directory name:", path.dirname(__filename), '\n');
console.log("📁 File name:", path.basename(__filename), '\n');
console.log("💥 File extension:", path.extname(__filename), '\n');

const joinPath = path.join("/user", "document", "node", "projects");
console.log("Joined path: ", joinPath);

// Construye una ruta absoluta a partir de segmentos de ruta relativos.
const resolvePath = path.resolve("user", "document", "node", "projects");
console.log("Resolve path: ", resolvePath);

/**
    Propósito: Normaliza una ruta eliminando componentes redundantes.
    Funcionamiento:
    Elimina barras duplicadas (ej: // → /).
    Resuelve . (directorio actual) y .. (directorio padre).
    Simplifica la ruta a su forma canónica.
 */
const normalizePath = path.normalize('/user/.documents/../node/projects');
console.log("normalize path: ", normalizePath);