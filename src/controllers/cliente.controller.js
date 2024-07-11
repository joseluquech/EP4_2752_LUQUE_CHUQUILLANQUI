import { getConexion } from './../database/database';

const listarClientes = async (req, res) => {
   try {
      const conexion = await getConexion();
      const resultado = await conexion.query(
         'SELECT idCliente, nombre, correo, telefono, direccion FROM cliente'
      );
      res.json(resultado);
   } catch (error) {
      res.status(500);
      res.send(error.message);
   }
};

const listarClientePorId = async (req, res) => {
   try {
      const { id } = req.params;
      const conexion = await getConexion();
      const resultado = await conexion.query(
         'SELECT idCliente, nombre, correo, telefono, direccion FROM cliente WHERE idCliente = ?',
         id
      );
      res.json(resultado);
   } catch (error) {
      res.status(500);
      res.send(error.message);
   }
};

const anadirCliente = async (req, res) => {
   try {
      const { nombre, correo, telefono, direccion } = req.body;

      if (
         nombre === undefined ||
         correo === undefined ||
         telefono === undefined ||
         direccion === undefined
      ) {
         return res.status(400).json({
            message: 'Por favor ingrese todos los campos',
         });
      }

      const cliente = { nombre, correo, telefono, direccion };
      const conexion = await getConexion();
      await conexion.query('INSERT INTO cliente SET ?', cliente);
      res.json({
         message: 'Cliente añadido con exito',
      });
   } catch (error) {
      res.status(500);
      res.send(error.message);
   }
};

const actualizarCliente = async (req, res) => {
   try {
      const { id } = req.params;
      const { nombre, correo, telefono, direccion } = req.body;

      if (
         id === undefined ||
         nombre === undefined ||
         correo === undefined ||
         telefono === undefined ||
         direccion === undefined
      ) {
         return res.status(400).json({
            message: 'Por favor ingrese todos los campos',
         });
      }

      const cliente = { idCliente: id, nombre, correo, telefono, direccion };
      const conexion = await getConexion();
      const resultado = await conexion.query(
         'UPDATE cliente SET ? WHERE idCliente = ?',
         [cliente, id]
      );
      res.json(resultado);
   } catch (error) {
      res.status(500);
      res.send(error.message);
   }
};

const eliminarCliente = async (req, res) => {
   try {
      const { id } = req.params;
      const conexion = await getConexion();
      const resultado = await conexion.query(
         'DELETE FROM cliente WHERE idCliente = ?',
         id
      );
      res.json(resultado);
   } catch (error) {
      res.status(500);
      res.send(error.message);
   }
};

export const methods = {
   listarClientes,
   listarClientePorId,
   anadirCliente,
   actualizarCliente,
   eliminarCliente,
};
