import express from "express";
import userRoutes from "./routes/userRoutes.js";
import perfilRoutes from "./routes/perfilRoutes.js";
import tareaRoutes from "./routes/tareaRoutes.js";
import etiquetaRoutes from "./routes/etiquetaRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
const app = express();
app.use(express.json());

app.use("/usuarios", userRoutes);
app.use("/usuarios", perfilRoutes);
app.use("/tareas", tareaRoutes);
app.use("/etiquetas", etiquetaRoutes);

app.use(errorHandler);

app.listen(3000, () => console.log("Servidor en http://localhost:3000"));