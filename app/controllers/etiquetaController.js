import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// POST /etiquetas → Crear etiqueta
export const crearEtiqueta = async (req, res, next) => {
  try {
    const { nombre } = req.body;
    const etiqueta = await prisma.etiqueta.create({
      data: { nombre },
    });
    res.json(etiqueta);
  } catch (error) {
    next(error);
  }
};

// POST Asociar etiquetas a una tarea
export const asociarEtiquetas = async (req, res, next) => {
  try {
    const { id } = req.params; 
    const { etiquetas } = req.body; 
    const relaciones = await Promise.all(
      etiquetas.map(async (etiquetaId) => {
        return prisma.tareaEtiqueta.create({
          data: {
            tareaId: Number(id),
            etiquetaId,
          },
        });
      })
    );
    res.json(relaciones);
  } catch (error) {
    next(error);
  }
};

// GET  Listar etiquetas de una tarea
export const listarEtiquetasDeTarea = async (req, res, next) => {
  try {
    const { id } = req.params;
    const etiquetas = await prisma.tareaEtiqueta.findMany({
      where: { tareaId: Number(id) },
      include: { etiqueta: true },
    });
    res.json(etiquetas.map((te) => te.etiqueta));
  } catch (error) {
    next(error);
  }
};

