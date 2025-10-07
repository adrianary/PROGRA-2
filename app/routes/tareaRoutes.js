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

router.post('/:id/etiquetas', asociarEtiquetas)

router.get('/:id/etiquetas', listarEtiquetasDeTarea)

export default router

