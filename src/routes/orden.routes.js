import { Router } from 'express';
import { methods as ordenController } from '../controllers/orden.controller';

const router = Router();

router.get('/', ordenController.listarOrdenes);
router.get('/:id', ordenController.listarOrdenPorId);
router.post('/', ordenController.anadirOrden);
router.patch('/:id', ordenController.actualizarEstadoOrden);
router.delete('/:id', ordenController.eliminarOrden);

export default router;
