const { success, error } = require('../utils/response');
const supabase = require('../config/supabase');

// URL base de API-Colombia
const API_COLOMBIA_URL = 'https://api-colombia.com/api/v1';

// Obtener todos los departamentos (para el buscador por región)
const getDepartments = async (req, res) => {
    try {
        // Llamamos a API-Colombia
        const response = await fetch(`${API_COLOMBIA_URL}/Department`);
        const departments = await response.json();

        return success(res, 'Departamentos obtenidos de API-Colombia', { 
            total: departments.length,
            departments 
        });

    } catch (err) {
        console.error('Error API-Colombia:', err);
        return error(res, 'Error al obtener departamentos de API-Colombia', 500);
    }
};

// Obtener ciudades por departamento
const getCitiesByDepartment = async (req, res) => {
    try {
        const { departmentId } = req.params;
        
        const response = await fetch(`${API_COLOMBIA_URL}/Department/${departmentId}/cities`);
        const cities = await response.json();

        return success(res, 'Ciudades obtenidas', { 
            departmentId,
            total: cities.length,
            cities 
        });

    } catch (err) {
        console.error('Error:', err);
        return error(res, 'Error al obtener ciudades', 500);
    }
};

// Obtener detalle de una ciudad específica
const getCityDetail = async (req, res) => {
    try {
        const { cityId } = req.params;
        
        const response = await fetch(`${API_COLOMBIA_URL}/City/${cityId}`);
        const city = await response.json();

        return success(res, 'Detalle de ciudad', { city });

    } catch (err) {
        console.error('Error:', err);
        return error(res, 'Error al obtener ciudad', 500);
    }
};

// Buscar en API-Colombia (simulado - filtrar ciudades por nombre)
const searchPlaces = async (req, res) => {
    try {
        const { query } = req.query; // ?query=medellin
        
        // Obtenemos todas las ciudades y filtramos
        const response = await fetch(`${API_COLOMBIA_URL}/City`);
        const allCities = await response.json();
        
        const filtered = allCities.filter(city => 
            city.name.toLowerCase().includes(query.toLowerCase())
        );

        return success(res, 'Búsqueda realizada', {
            query,
            results: filtered.length,
            cities: filtered
        });

    } catch (err) {
        console.error('Error:', err);
        return error(res, 'Error en búsqueda', 500);
    }
};

// Guardar favorito (referencia a API-Colombia)
const saveFavorite = async (req, res) => {
    try {
        const { api_colombia_id, tipo_lugar, notas } = req.body;
        const user_id = req.user.userId; // del token JWT

        const { data: favorito, error: dbError } = await supabase
            .from('favoritos')
            .insert([{ 
                user_id, 
                api_colombia_id, 
                tipo_lugar, 
                notas 
            }])
            .select()
            .single();

        if (dbError) throw dbError;

        return success(res, 'Favorito guardado', { favorito }, 201);

    } catch (err) {
        console.error('Error:', err);
        return error(res, 'Error al guardar favorito', 500);
    }
};

// Obtener mis favoritos (con datos de API-Colombia)
const getMyFavorites = async (req, res) => {
    try {
        const user_id = req.user.userId;

        // 1. Obtenemos favoritos de nuestra DB
        const { data: favoritos, error: dbError } = await supabase
            .from('favoritos')
            .select('*')
            .eq('user_id', user_id);

        if (dbError) throw dbError;

        // 2. Para cada favorito, consultamos API-Colombia
        const favoritosConDatos = await Promise.all(
            favoritos.map(async (fav) => {
                try {
                    const response = await fetch(`${API_COLOMBIA_URL}/City/${fav.api_colombia_id}`);
                    const cityData = await response.json();
                    return {
                        ...fav,
                        datos_api: cityData
                    };
                } catch (e) {
                    return {
                        ...fav,
                        datos_api: null,
                        error: 'No se pudo obtener datos de API-Colombia'
                    };
                }
            })
        );

        return success(res, 'Mis favoritos', { 
            total: favoritosConDatos.length,
            favoritos: favoritosConDatos 
        });

    } catch (err) {
        console.error('Error:', err);
        return error(res, 'Error al obtener favoritos', 500);
    }
};

module.exports = {
    getDepartments,
    getCitiesByDepartment,
    getCityDetail,
    searchPlaces,
    saveFavorite,
    getMyFavorites
};