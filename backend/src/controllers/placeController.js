const supabase = require('../config/supabase');
const { success, error } = require('../utils/response');

// CREAR LUGAR
const createPlace = async (req, res) => {
    try {
        const { name, description, category, latitude, longitude, city_id } = req.body;

        const { data: place, error: dbError } = await supabase
            .from('places')
            .insert([{ name, description, category, latitude, longitude, city_id }])
            .select()
            .single();

        if (dbError) throw dbError;

        return success(res, 'Lugar creado exitosamente.', { place }, 201);

    } catch (err) {
        console.error('Error:', err);
        return error(res, 'Error al crear lugar.', 500);
    }
};

// OBTENER TODOS LOS LUGARES (con filtros opcionales)
const getAllPlaces = async (req, res) => {
    try {
        let query = supabase
            .from('places')
            .select('*');

        // Filtros opcionales (para el motor de búsqueda)
        if (req.query.category) {
            query = query.eq('category', req.query.category);
        }
        if (req.query.city_id) {
            query = query.eq('city_id', req.query.city_id);
        }
        if (req.query.search) {
            query = query.ilike('name', `%${req.query.search}%`);
        }

        const { data: places, error: dbError } = await query.order('created_at', { ascending: false });

        if (dbError) throw dbError;

        return success(res, 'Lugares obtenidos.', { places });

    } catch (err) {
        console.error('Error:', err);
        return error(res, 'Error al obtener lugares.', 500);
    }
};

// OBTENER UN LUGAR POR ID
const getPlaceById = async (req, res) => {
    try {
        const { id } = req.params;

        const { data: place, error: dbError } = await supabase
            .from('places')
            .select('*')
            .eq('id', id)
            .single();

        if (dbError || !place) {
            return error(res, 'Lugar no encontrado.', 404);
        }

        return success(res, 'Lugar obtenido.', { place });

    } catch (err) {
        console.error('Error:', err);
        return error(res, 'Error al obtener lugar.', 500);
    }
};

// ACTUALIZAR LUGAR
const updatePlace = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, category, latitude, longitude, city_id } = req.body;

        const { data: place, error: dbError } = await supabase
            .from('places')
            .update({ name, description, category, latitude, longitude, city_id })
            .eq('id', id)
            .select()
            .single();

        if (dbError || !place) {
            return error(res, 'Lugar no encontrado.', 404);
        }

        return success(res, 'Lugar actualizado.', { place });

    } catch (err) {
        console.error('Error:', err);
        return error(res, 'Error al actualizar lugar.', 500);
    }
};

// ELIMINAR LUGAR
const deletePlace = async (req, res) => {
    try {
        const { id } = req.params;

        const { data: place, error: dbError } = await supabase
            .from('places')
            .delete()
            .eq('id', id)
            .select()
            .single();

        if (dbError || !place) {
            return error(res, 'Lugar no encontrado.', 404);
        }

        return success(res, 'Lugar eliminado.', { place });

    } catch (err) {
        console.error('Error:', err);
        return error(res, 'Error al eliminar lugar.', 500);
    }
};

module.exports = {
    createPlace,
    getAllPlaces,
    getPlaceById,
    updatePlace,
    deletePlace
};