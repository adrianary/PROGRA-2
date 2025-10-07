import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


export const crearTarea = async (req, res) => {
  const { id } = req.params 
  const { titulo, descripcion } = req.body

  try {
    const tarea = await prisma.tarea.create({
      data: {
        titulo,
        descripcion,
        usuario: {
          connect: { id: Number(id) }
        }
      }
    })
    res.status(201).json(tarea)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
export const listarTareas = async (req, res) => {
  const { id } = req.params 

  try {
    const tareas = await prisma.tarea.findMany({
      where: { usuarioId: Number(id) },
      include: { etiquetas: true } 
    })
    res.json(tareas)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export const asociarEtiquetas = async (req, res) => {
  const { id } = req.params 
  const { etiquetasIds } = req.body

  try {
    const tarea = await prisma.tarea.update({
      where: { id: Number(id) },
      data: {
        etiquetas: {
          connect: etiquetasIds.map((etiquetaId) => ({ id: etiquetaId }))
        }
      },
      include: { etiquetas: true }
    })
    res.json(tarea)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export const listarEtiquetasDeTarea = async (req, res) => {
  const { id } = req.params 

  try {
    const tarea = await prisma.tarea.findUnique({
      where: { id: Number(id) },
      include: { etiquetas: true }
    })

    if (!tarea) {
      return res.status(404).json({ error: 'Tarea no encontrada' })
    }

    res.json(tarea.etiquetas)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

