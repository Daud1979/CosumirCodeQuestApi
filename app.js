const express = require("express");

const path = require("path");

const app = express();
const PORT = 3000;

// Configurar EJS como motor de plantillas
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Ruta principal
app.get("/", async (req, res) => {
  try {
    res.render("index");
  } catch (error) {
    res.status(400).send("Error no found");
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
