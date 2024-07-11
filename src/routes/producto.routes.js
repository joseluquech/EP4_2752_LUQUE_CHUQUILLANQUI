import { Router } from "express";
import { methods as productoController } from "../controllers/producto.controller"

const router = Router();

router.get("/", productoController.listarProductos);
router.get("/:id", productoController.listarProductoPorId);
router.post("/", productoController.anadirProducto);
router.put("/:id", productoController.actualizarProducto);
router.delete("/:id", productoController.eliminarProducto);

export default router;