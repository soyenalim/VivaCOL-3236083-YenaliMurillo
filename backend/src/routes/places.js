const express = require('express');
const router = express.Router();
const placeController = require('../controllers/placeController');
const { verifyToken, isAdmin } = require('../middleware/auth');

// Rutas públicas (cualquiera puede ver)
router.get('/', placeController.getAllPlaces);
router.get('/:id', placeController.getPlaceById);

// Rutas protegidas (solo admins pueden crear/modificar/eliminar)
router.post('/', verifyToken, isAdmin, placeController.createPlace);
router.put('/:id', verifyToken, isAdmin, placeController.updatePlace);
router.delete('/:id', verifyToken, isAdmin, placeController.deletePlace);

module.exports = router;