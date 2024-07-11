import { getConexion } from './../database/database';

const listarProductos = async (req, res) => {
   try {
      const conexion = await getConexion();
      const resultado = await conexion.query(
         'SELECT idProducto, nombre, descripcion, precio, cantidad, idCategoria FROM producto'
      );
      res.json(resultado);
   } catch (error) {
      res.status(500);
      res.send(error.message);
   }
};

const listarProductoPorId = async (req, res) => {
   try {
      const { id } = req.params;
      const conexion = await getConexion();
      const resultado = await conexion.query(
         'SELECT idProducto, nombre, descripcion, precio, cantidad, idCategoria FROM producto WHERE idProducto = ?',
         id
      );
      res.json(resultado);
   } catch (error) {
      res.status(500);
      res.send(error.message);
   }
};

const anadirProducto = async (req, res) => {
   try {
      const { nombre, descripcion, precio, cantidad, idCategoria } = req.body;

      if (
         nombre === undefined ||
         descripcion === undefined ||
         precio === undefined ||
         cantidad === undefined ||
         idCategoria === undefined
      ) {
         return res.status(400).json({
            message: 'Por favor ingrese todos los campos',
         });
      }

      // Validar categoria existente
      const conexion = await getConexion();
      const categoriaExiste = await conexion.query(
         'SELECT * FROM categoria WHERE idCategoria = ?',
         idCategoria
      );

      if (categoriaExiste.length === 0) {
         return res.status(400).json({
            message: 'La categoria indicada no existe',
         });
      }

      const producto = { nombre, descripcion, precio, cantidad, idCategoria };

      await conexion.query('INSERT INTO producto SET ?', producto);
      res.json({
         message: 'Producto añadido con exito',
      });
   } catch (error) {
      res.status(500);
      res.send(error.message);
   }
};

const actualizarProducto = async (req, res) => {
   try {
      const { id } = req.params;
      const { nombre, descripcion, precio, cantidad, idCategoria } = req.body;

      if (
         id === undefined ||
         nombre === undefined ||
         descripcion === undefined ||
         precio === undefined ||
         cantidad === undefined ||
         idCategoria === undefined
      ) {
         return res.status(400).json({
            message: 'Por favor ingrese todos los campos',
         });
      }

      // Validar categoria existente
      const conexion = await getConexion();
      const categoriaExiste = await conexion.query(
         'SELECT * FROM categoria WHERE idCategoria = ?',
         idCategoria
      );

      if (categoriaExiste.length === 0) {
         return res.status(400).json({
            message: 'La categoria indicada no existe',
         });
      }

      const producto = {
         idProducto: id,
         nombre,
         descripcion,
         precio,
         cantidad,
         idCategoria,
      };

      const resultado = await conexion.query(
         'UPDATE producto SET ? WHERE idProducto = ?',
         [producto, id]
      );
      res.json(resultado);
   } catch (error) {
      res.status(500);
      res.send(error.message);
   }
};

const eliminarProducto = async (req, res) => {
   try {
      const { id } = req.params;
      const conexion = await getConexion();
      const resultado = await conexion.query(
         'DELETE FROM producto WHERE idProducto = ?',
         id
      );
      res.json(resultado);
   } catch (error) {
      res.status(500);
      res.send(error.message);
   }
};

export const methods = {
   listarProductos,
   listarProductoPorId,
   anadirProducto,
   actualizarProducto,
   eliminarProducto,
};
