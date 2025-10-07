import express from "express";
import { crearUsuario } from "../controllers/userController.js";

const router = express.Router();
router.post("/", crearUsuario);

export default router;
