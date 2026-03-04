const supabase = require('../config/supabase');
const { success, error } = require('../utils/response');
const bcrypt = require('bcryptjs');

// OBTENER TODOS LOS USUARIOS (solo admin)
const getAllUsers = async (req, res) => {
    try {
        const { data: users, error: dbError } = await supabase
            .from('users')
            .select('id, full_name, email, username, role, status, created_at')  // ← AGREGADO username
            .order('created_at', { ascending: false });

        if (dbError) throw dbError;

        return success(res, 'Usuarios obtenidos.', { users });

    } catch (err) {
        console.error('Error:', err);
        return error(res, 'Error al obtener usuarios.', 500);
    }
};

// OBTENER UN USUARIO POR ID
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        
        const { data: user, error: dbError } = await supabase
            .from('users')
            .select('id, full_name, email, username, role, status, created_at')  // ← AGREGADO username
            .eq('id', id)
            .single();

        if (dbError || !user) {
            return error(res, 'Usuario no encontrado.', 404);
        }

        return success(res, 'Usuario obtenido.', { user });

    } catch (err) {
        console.error('Error:', err);
        return error(res, 'Error al obtener usuario.', 500);
    }
};

// ACTUALIZAR USUARIO
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { full_name, email, username, role, status } = req.body;  // ← AGREGADO username

        const { data: existingUser } = await supabase
            .from('users')
            .select('*')
            .eq('id', id)
            .single();

        if (!existingUser) {
            return error(res, 'Usuario no encontrado.', 404);
        }

        // Validar que el username no esté en uso por otro usuario (si se proporciona)
        if (username && username !== existingUser.username) {
            const { data: userWithUsername } = await supabase
                .from('users')
                .select('id')
                .eq('username', username)
                .neq('id', id)  // Excluir el usuario actual
                .single();

            if (userWithUsername) {
                return error(res, 'El username ya está en uso.', 400);
            }
        }

        const { data: updatedUser, error: dbError } = await supabase
            .from('users')
            .update({ full_name, email, username, role, status })  // ← AGREGADO username
            .eq('id', id)
            .select('id, full_name, email, username, role, status')  // ← AGREGADO username
            .single();

        if (dbError) throw dbError;

        return success(res, 'Usuario actualizado.', { user: updatedUser });

    } catch (err) {
        console.error('Error:', err);
        return error(res, 'Error al actualizar usuario.', 500);
    }
};

// ELIMINAR USUARIO (desactivar)
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const { data: user, error: dbError } = await supabase
            .from('users')
            .update({ status: false })
            .eq('id', id)
            .select('id, full_name, username, status')  // ← AGREGADO username (opcional)
            .single();

        if (dbError || !user) {
            return error(res, 'Usuario no encontrado.', 404);
        }

        return success(res, 'Usuario desactivado.', { user });

    } catch (err) {
        console.error('Error:', err);
        return error(res, 'Error al eliminar usuario.', 500);
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};