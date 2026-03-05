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

        // Solo el propio usuario o un admin puede editar
        if (String(req.user.userId) !== String(id) && req.user.role !== 'admin') {
            return error(res, 'No autorizado para editar este usuario.', 403);
        }

        const { full_name, email, username, role, status } = req.body;  // ← AGREGADO username

        const { data: existingUser } = await supabase
            .from('users')
            .select('*')
            .eq('id', id)
            .single();

        if (!existingUser) {
            return error(res, 'Usuario no encontrado.', 404);
        }

        if (username && username !== existingUser.username) {
            const { data: usersWithUsername, error: usernameError } = await supabase
                .from('users')
                .select('id')
                .eq('username', username)
                .neq('id', id);

            if (usernameError) {
                console.error('Error verificando username:', usernameError);
                return error(res, 'Error verificando username.', 500);
            }

            if (usersWithUsername.length > 0) {
                return error(res, 'El username ya está en uso.', 409);
            }
        }

        // Validar que el email no esté en uso por otro usuario (si se proporciona)
        if (email && email !== existingUser.email) {
            const { data: usersWithEmail, error: emailError } = await supabase
                .from('users')
                .select('id')
                .eq('email', email)
                .neq('id', id);

            if (emailError) {
                console.error('Error verificando email:', emailError);
                return error(res, 'Error verificando email.', 500);
            }

            if (usersWithEmail.length > 0) {
                return error(res, 'El email ya está registrado.', 409);
            }
        }

        // Construir objeto de actualización dinámicamente
        let updateData = {};

        // Campos que cualquier usuario puede cambiar
        if (full_name !== undefined) updateData.full_name = full_name;
        if (email !== undefined) updateData.email = email;
        if (username !== undefined) updateData.username = username;

        // Solo admin puede cambiar role y status
        if (req.user.role === 'admin') {
            if (role !== undefined) updateData.role = role;
            if (status !== undefined) updateData.status = status;
        }

        const { data: updatedUser, error: dbError } = await supabase
            .from('users')
            .update(updateData)
            .eq('id', id)
            .select('id, full_name, email, username, role, status')
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