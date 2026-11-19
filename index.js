import express from "express";
import { conectarDB, Producto } from "./database.js";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ mensaje: "Bienvenido a Marathon" });
});

app.get("/productos", (req, res) => {
  res.json({ mensaje: "Lista de Productos" });
});

app.post("/producto", async (req, res) => {
  try {
    // Paso 1: Información del request.body
    const datos = req.body;

    // Paso 2: Validaciones (las hace el esquema de Mongoose)

    // Paso 3: Lógica
    const producto = new Producto(datos);
    await producto.save();

    // Paso 4: Mensajes de respuesta
    res.status(201).json({ mensaje: "Producto guardado correctamente", producto });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ mensaje: "Datos no válidos", detalle: error.message });
    }
    console.error(error);
    res.status(500).json({ mensaje: "Error al guardar el producto" });
  }
});

conectarDB().catch((err) => console.error(err));

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});