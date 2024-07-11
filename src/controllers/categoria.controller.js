import { getConexion } from './../database/database';

const listarCategorias = async (req, res) => {
   try {
      const conexion = await getConexion();
      const resultado = await conexion.query(
         'SELECT idCategoria, nombre, descripcion FROM categoria'
      );
      res.json(resultado);
   } catch (error) {
      res.status(500);
      res.send(error.message);
   }
};

const listarCategoriaPorId = async (req, res) => {
   try {
      const { id } = req.params;
      const conexion = await getConexion();
      const resultado = await conexion.query(
         'SELECT idCategoria, nombre, descripcion FROM categoria WHERE idCategoria = ?',
         id
      );
      res.json(resultado);
   } catch (error) {
      res.status(500);
      res.send(error.message);
   }
};

const anadirCategoria = async (req, res) => {
   try {
      const { nombre, descripcion } = req.body;

      if (nombre === undefined || descripcion === undefined) {
         return res.status(400).json({
            message: 'Por favor ingrese todos los campos',
         });
      }

      const categoria = { nombre, descripcion };
      const conexion = await getConexion();
      await conexion.query('INSERT INTO categoria SET ?', categoria);
      res.json({
         message: 'Categoria añadida con exito',
      });
   } catch (error) {
      res.status(500);
      res.send(error.message);
   }
};

const actualizarCategoria = async (req, res) => {
   try {
      const { id } = req.params;
      const { nombre, descripcion } = req.body;

      if (
         id === undefined ||
         nombre === undefined ||
         descripcion === undefined
      ) {
         return res.status(400).json({
            message: 'Por favor ingrese todos los campos',
         });
      }

      const categoria = { idCategoria: id, nombre, descripcion };
      const conexion = await getConexion();
      const resultado = await conexion.query(
         'UPDATE categoria SET ? WHERE idCategoria = ?',
         [categoria, id]
      );
      res.json(resultado);
   } catch (error) {
      res.status(500);
      res.send(error.message);
   }
};

const eliminarCategoria = async (req, res) => {
   try {
      const { id } = req.params;
      const conexion = await getConexion();
      const resultado = await conexion.query(
         'DELETE FROM categoria WHERE idCategoria = ?',
         id
      );
      res.json(resultado);
   } catch (error) {
      res.status(500);
      res.send(error.message);
   }
};

export const methods = {
   listarCategorias,
   listarCategoriaPorId,
   anadirCategoria,
   actualizarCategoria,
   eliminarCategoria,
};
