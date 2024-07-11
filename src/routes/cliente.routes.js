import { Router } from "express";
import { methods as clienteController } from "../controllers/cliente.controller";

const router = Router();

router.get("/", clienteController.listarClientes);
router.get("/:id", clienteController.listarClientePorId);
router.post("/", clienteController.anadirCliente);
router.put("/:id", clienteController.actualizarCliente);
router.delete("/:id", clienteController.eliminarCliente);

export default router;