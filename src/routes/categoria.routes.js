import { Router } from "express";
import { methods as categoriaController } from "../controllers/categoria.controller";

const router = Router();

router.get("/", categoriaController.listarCategorias);
router.get("/:id", categoriaController.listarCategoriaPorId);
router.post("/", categoriaController.anadirCategoria);
router.put("/:id", categoriaController.actualizarCategoria);
router.delete("/:id", categoriaController.eliminarCategoria);

export default router;