const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Importar rutas
const authRoutes = require('./src/routes/auth');
const userRoutes = require('./src/routes/users');
const placeRoutes = require('./src/routes/places');
const colombiaRoutes = require('./src/routes/colombia');

// Usar rutas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/places', placeRoutes);
app.use('/api/colombia', colombiaRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({ 
        message: 'VivaCOL API funcionando correctamente',
        version: '1.0.0',
        endpoints: {
            auth: '/api/auth',
            users: '/api/users',
            places: '/api/places'
        }
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📚 Documentación de endpoints disponible en http://localhost:${PORT}/`);
});

module.exports = app;