import express from "espress";
import {
    loguearUsuario,
    registrarUsuario,
} from "../controllers/userControllers";

const userRoutes = express.Router();

//userRouter.get("")

userRoutes.post("/register", registrarUsuario);
userRoutes.post("/login", loguearUsuario);

export default userRoutes;