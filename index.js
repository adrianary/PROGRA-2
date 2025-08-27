const express = require("express");
const app = express();

app.use(express.json());

let usuarios = [];
let pedidos = [];

function requireRole(rol) {
    return (req, res, next) => {
        const { usuarioId } = req.body;
        const usuario = usuarios.find(u => u.id === usuarioId);

        if (!usuario) {
            return res.status(404).json({ msg: "Usuario no encontrado" });
        }

        if (usuario.rol !== rol) {
            return res.status(403).json({ msg: `Acceso denegado. Solo ${rol} puede realizar esta acción.` });
        }

        
        req.usuario = usuario;
        next();
    };
}

function validarItems(req, res, next) {
    const { items } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ msg: "El pedido debe contener al menos un item" });
    }

    const todosSonStrings = items.every(item => typeof item === "string");
    if (!todosSonStrings) {
        return res.status(400).json({ msg: "Todos los items deben ser strings" });
    }

    next();
}

function logCambioEstado(req, res, next) {
    const pedidoId = req.params.id;
    const nuevoEstado = req.body.estado;
    const usuario = req.usuario;

    console.log(`📝 Usuario "${usuario.nombre}" (${usuario.rol}) cambió el estado del pedido ${pedidoId} a "${nuevoEstado}".`);

    next();
}


app.post("/usuarios", (req, res) => {
    const { nombre, rol } = req.body;

    if (!nombre || !rol) {
        return res.status(400).json({ msg: "Nombre y rol son obligatorios" });
    }

    if (!["admin", "cliente"].includes(rol)) {
        return res.status(400).json({ msg: "Rol inválido. Debe ser 'admin' o 'cliente'" });
    }

    const nuevoUsuario = {
        id: usuarios.length + 1,
        nombre,
        rol
    };

    usuarios.push(nuevoUsuario);
    res.status(201).json(nuevoUsuario);
});

app.post("/pedidos", requireRole("cliente"), validarItems, (req, res) => {
    const { usuario } = req;
    const { items } = req.body;

    const nuevoPedido = {
        id: pedidos.length + 1,
        usuarioId: usuario.id,
        items,
        estado: "pendiente"
    };

    pedidos.push(nuevoPedido);
    res.status(201).json(nuevoPedido);
});

app.put("/pedidos/:id/estado", requireRole("admin"), logCambioEstado, (req, res) => {
    const pedidoId = parseInt(req.params.id);
    const { estado } = req.body;

    const pedido = pedidos.find(p => p.id === pedidoId);

    if (!pedido) {
        return res.status(404).json({ msg: "Pedido no encontrado" });
    }

    if (!["pendiente", "en_proceso", "entregado"].includes(estado)) {
        return res.status(400).json({ msg: "Estado inválido. Use: pendiente, en_proceso o entregado" });
    }

    pedido.estado = estado;

    res.json({ msg: "Estado actualizado", pedido });
});

app.get("/pedidos", (req, res) => {
    const { usuarioId } = req.body;
    const usuario = usuarios.find(u => u.id === usuarioId);

    if (!usuario) {
        return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    if (usuario.rol === "admin") {
        return res.json(pedidos);
    } else {
        return res.json(pedidos.filter(p => p.usuarioId === usuario.id));
    }
});

app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});
