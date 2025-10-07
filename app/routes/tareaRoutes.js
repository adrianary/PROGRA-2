import express from 'express'
import {
  crearTarea,
  listarTareas,
  asociarEtiquetas,
  listarEtiquetasDeTarea
} from '../controllers/tareaController.js'

const router = express.Router()

router.post('/usuarios/:id/tareas', crearTarea)

router.get('/usuarios/:id/tareas', listarTareas)

router.post('/tareas/:id/etiquetas', asociarEtiquetas)

router.get('/tareas/:id/etiquetas', listarEtiquetasDeTarea)

export default router

