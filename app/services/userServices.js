import bcrypt from "bcryptjs"; 

const users = [];

export const registrar = async ({username, password}) => {
    const usuarioExistente = users.find((user) => user.username === username);
    if (usuarioExistente) throw new Error("El usuario ya existe");

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {id: username, username, hashedPassword};
    users.push(newUser);

    return { newUser };
}; 

export const login = ({username, password}) => {};

