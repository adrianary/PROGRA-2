import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// POST Crear usuario
export const crearUsuario = async (req, res, next) => {
  try {
    const { nombre, email } = req.body;
    const usuario = await prisma.usuario.create({
      data: { nombre, email },
    });
    res.json(usuario);
  } catch (error) {
    next(error);
  }
};
