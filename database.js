import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
  Foto: { type: String, required: true, trim: true },
  Titulo: { type: String, required: true, trim: true },
  Descripcion: { type: String, required: true, trim: true },
  Precio: { type: Number, required: true, min: 0.01 },
  Talla: { type: Number, required: true, min: 1, validate: Number.isInteger },
  Cantidad: { type: Number, required: true, min: 1, validate: Number.isInteger },
});

export const Producto = mongoose.model("Producto", productoSchema);

export async function conectarDB() {
  await mongoose.connect("mongodb://127.0.0.1:27017/shop");
  console.log("Conectado a MongoDB (base de datos: shop)");
}