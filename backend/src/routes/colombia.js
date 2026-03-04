const express = require('express');
const router = express.Router();
const colombiaController = require('../controllers/apiColombiaController');
const { verifyToken } = require('../middleware/auth');

// Rutas públicas (no necesitan login)
router.get('/departments', colombiaController.getDepartments);
router.get('/department/:departmentId/cities', colombiaController.getCitiesByDepartment);
router.get('/city/:cityId', colombiaController.getCityDetail);
router.get('/search', colombiaController.searchPlaces);

// Rutas privadas (necesitan token)
router.post('/favorites', verifyToken, colombiaController.saveFavorite);
router.get('/favorites/my', verifyToken, colombiaController.getMyFavorites);

module.exports = router;