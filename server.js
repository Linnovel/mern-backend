import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDb } from './config/db.js'
import productRoutes from './routes/product.routes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors())
app.use(express.json())

// Rutas
app.use("/api/products", productRoutes)

// Servir frontend en producción
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")))

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
    })
}

// Conectar DB y arrancar servidor
connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor en puerto ${PORT}`)
    })
}).catch((error) => {
    console.error("Error al conectar a MongoDB:", error)
})
