import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// POST Crear perfil
export const crearPerfil = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { bio, edad } = req.body;
    const perfil = await prisma.perfil.create({
      data: {
        bio,
        edad,
        usuario: { connect: { id: Number(id) } },
      },
    });
    res.json(perfil);
  } catch (error) {
    next(error);
  }
};

// GET  Obtener perfil
export const obtenerPerfil = async (req, res, next) => {
  try {
    const { id } = req.params;
    const perfil = await prisma.perfil.findUnique({
      where: { usuarioId: Number(id) },
    });
    res.json(perfil);
  } catch (error) {
    next(error);
  }
};
