import { getConexion } from './../database/database';

const listarOrdenes = async (req, res) => {
   try {
      const conexion = await getConexion();
      const resultado = await conexion.query(
         'SELECT idOrden, cantidad, total, estado, idProducto, idCliente FROM orden'
      );
      res.json(resultado);
   } catch (error) {
      res.status(500);
      res.send(error.message);
   }
};

const listarOrdenPorId = async (req, res) => {
   try {
      const { id } = req.params;
      const conexion = await getConexion();
      const resultado = await conexion.query(
         'SELECT idOrden, cantidad, total, estado, idProducto, idCliente FROM orden WHERE idOrden = ?',
         id
      );
      res.json(resultado);
   } catch (error) {
      res.status(500);
      res.send(error.message);
   }
};

const anadirOrden = async (req, res) => {
   try {
      const { cantidad, total, estado, idProducto, idCliente } = req.body;

      if (
         cantidad === undefined ||
         total === undefined ||
         estado === undefined ||
         idProducto === undefined ||
         idCliente === undefined
      ) {
         return res.status(400).json({
            message: 'Por favor ingrese todos los campos',
         });
      }

      // Validar producto y cliente existentes
      const conexion = await getConexion();
      const productoExiste = await conexion.query(
         'SELECT * FROM producto WHERE idProducto = ?',
         idProducto
      );
      const clienteExiste = await conexion.query(
         'SELECT * FROM cliente WHERE idCliente = ?',
         idCliente
      );

      if (productoExiste.length === 0 || clienteExiste.length === 0) {
         return res.status(400).json({
            message: 'El producto y/o cliente indicado no existe',
         });
      }

      // Validar estado existente
      if (
         estado.toLowerCase() !== 'pendiente' &&
         estado.toLowerCase() !== 'enviado' &&
         estado.toLowerCase() !== 'entregado'
      ) {
         return res.status(400).json({
            message: 'Por favor ingrese un estado valido',
         });
      }

      const orden = { cantidad, total, estado, idProducto, idCliente };

      await conexion.query('INSERT INTO orden SET ?', orden);
      res.json({
         message: 'Producto añadido con exito',
      });
   } catch (error) {
      res.status(500);
      res.send(error.message);
   }
};

const actualizarEstadoOrden = async (req, res) => {
   try {
      const { id } = req.params;
      const { estado } = req.body;

      if (id === undefined || estado === undefined) {
         return res.status(400).json({
            message: 'Por favor ingrese un estado',
         });
      }

      // Validar estado existente
      if (
         estado.toLowerCase() !== 'pendiente' &&
         estado.toLowerCase() !== 'enviado' &&
         estado.toLowerCase() !== 'entregado'
      ) {
         return res.status(400).json({
            message: 'Por favor ingrese un estado valido',
         });
      }

      const conexion = await getConexion();
      const orden = { estado };

      await conexion.query('UPDATE orden SET ? WHERE idOrden = ?', [orden, id]);
      res.json({
         message: 'Estado modificado con exito',
      });
   } catch (error) {
      res.status(500);
      res.send(error.message);
   }
};

const eliminarOrden = async (req, res) => {
   try {
      const { id } = req.params;
      const conexion = await getConexion();
      const resultado = await conexion.query(
         'DELETE FROM orden WHERE idOrden = ?',
         id
      );
      res.json(resultado);
   } catch (error) {
      res.status(500);
      res.send(error.message);
   }
};

export const methods = {
   listarOrdenes,
   listarOrdenPorId,
   anadirOrden,
   actualizarEstadoOrden,
   eliminarOrden,
};
