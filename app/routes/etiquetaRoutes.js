import express from "express";
import { crearEtiqueta, asociarEtiquetas, listarEtiquetasDeTarea } from "../controllers/etiquetaController.js";

const router = express.Router();

router.post("/", crearEtiqueta);
router.post("/tareas/:id/etiquetas", asociarEtiquetas);
router.get("/tareas/:id/etiquetas", listarEtiquetasDeTarea);

export default router;

