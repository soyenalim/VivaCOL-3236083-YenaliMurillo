const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const { verifyToken } = require('../middleware/auth');

// Validaciones para registro
const registerValidation = [
    body('full_name').notEmpty().withMessage('El nombre es obligatorio'),
    body('email').isEmail().withMessage('Email inválido'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
];

// Validaciones para login
const loginValidation = [
    body('email').isEmail().withMessage('Email inválido'),
    body('password').notEmpty().withMessage('La contraseña es obligatoria')
];

// Rutas públicas (no requieren token)
router.post('/register', registerValidation, authController.register);
router.post('/login', loginValidation, authController.login);

// Rutas privadas (requieren token)
router.get('/profile', verifyToken, authController.getProfile);

module.exports = router;