const jwt = require('jsonwebtoken');
const { error } = require('../utils/response');

// Este middleware verifica que el usuario esté logueado
// Lo usamos en rutas que requieren autenticación

const verifyToken = (req, res, next) => {
    // El token viene en el header: Authorization: Bearer <token>
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
        return error(res, 'Acceso denegado. Token no proporcionado.', 401);
    }

    try {
        // Verificamos que el token sea válido con la clave secreta
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Guardamos la info del usuario en req para usarla después
        req.user = decoded;
        
        // next() continúa a la siguiente función (el controller)
        next();
    } catch (err) {
        return error(res, 'Token inválido o expirado.', 401);
    }
};

// Verifica que el usuario sea admin
const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return error(res, 'Acceso denegado. Se requiere rol de administrador.', 403);
    }
    next();
};

module.exports = { verifyToken, isAdmin };