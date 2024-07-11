import mysql from 'promise-mysql';
import config from './../config';

const conexion = mysql.createConnection({
   host: config.host,
   database: config.database,
   user: config.user,
   password: config.password,
});

const getConexion = () => {
   return conexion;
};

module.exports = {
   getConexion,
};
