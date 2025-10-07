import express from "express";
import { crearPerfil, obtenerPerfil } from "../controllers/perfilController.js";

const router = express.Router();

router.post("/:id/perfil", crearPerfil);
router.get("/:id/perfil", obtenerPerfil);

export default router;
