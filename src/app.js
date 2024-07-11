import express from 'express';
import morgan from 'morgan';
// Routes
import categoriaRoutes from './routes/categoria.routes';
import clienteRoutes from './routes/cliente.routes';
import productoRoutes from './routes/producto.routes';
import ordenRoutes from './routes/orden.routes';

const app = express();

// Configuraciones
app.set('port', 4000);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Rutas
app.use('/apiTechStore/categoria', categoriaRoutes);
app.use('/apiTechStore/cliente', clienteRoutes);
app.use('/apiTechStore/producto', productoRoutes);
app.use('/apiTechStore/orden', ordenRoutes);

export default app;
