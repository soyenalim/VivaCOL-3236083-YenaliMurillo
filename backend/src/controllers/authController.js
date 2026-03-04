const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const supabase = require('../config/supabase');
const { success, error } = require('../utils/response');

// REGISTRO DE USUARIOS
const register = async (req, res) => {
    try {
        const { full_name, email, username, password, role = 'turista' } = req.body;  // ← AGREGADO username

        // Validar que vengan todos los datos requeridos
        if (!full_name || !email || !password) {
            return error(res, 'Nombre, email y contraseña son obligatorios.', 400);
        }

        // 1. Validar que no exista el email
        const { data: existingUser, error: searchError } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        // Si encontró usuario, error
        if (existingUser) {
            return error(res, 'El email ya está registrado.', 400);
        }

        // 2. Validar que no exista el username (si se proporciona)
        if (username) {
            const { data: existingUsername } = await supabase
                .from('users')
                .select('*')
                .eq('username', username)
                .single();

            if (existingUsername) {
                return error(res, 'El username ya está en uso.', 400);
            }
        }

        // 3. Encriptar contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // 4. Insertar usuario en Supabase
        const { data: newUser, error: dbError } = await supabase
            .from('users')
            .insert([
                { full_name, email, username, password: hashedPassword, role }  // ← AGREGADO username
            ])
            .select()
            .single();

        if (dbError) {
            console.error('Error de Supabase:', dbError);
            return error(res, 'Error al crear usuario en base de datos.', 500);
        }

        if (!newUser) {
            return error(res, 'No se pudo crear el usuario.', 500);
        }

        // 5. Generar JWT
        const token = jwt.sign(
            { 
                userId: newUser.id, 
                email: newUser.email, 
                role: newUser.role 
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        return success(res, 'Usuario registrado exitosamente.', {
            user: {
                id: newUser.id,
                full_name: newUser.full_name,
                email: newUser.email,
                username: newUser.username,  // ← AGREGADO username
                role: newUser.role
            },
            token
        }, 201);

    } catch (err) {
        console.error('Error en registro:', err);
        return error(res, 'Error interno al registrar usuario.', 500);
    }
};

// LOGIN DE USUARIOS
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return error(res, 'Email y contraseña son obligatorios.', 400);
        }

        // 1. Buscar usuario por email
        const { data: user, error: dbError } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        if (dbError || !user) {
            return error(res, 'Usuario o contraseña incorrectos.', 401);
        }

        // 2. Verificar contraseña
        const isValidPassword = await bcrypt.compare(password, user.password);
        
        if (!isValidPassword) {
            return error(res, 'Usuario o contraseña incorrectos.', 401);
        }

        // 3. Generar JWT
        const token = jwt.sign(
            { 
                userId: user.id, 
                email: user.email, 
                role: user.role 
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        return success(res, 'Login exitoso.', {
            user: {
                id: user.id,
                full_name: user.full_name,
                email: user.email,
                username: user.username,  // ← AGREGADO username
                role: user.role
            },
            token
        });

    } catch (err) {
        console.error('Error en login:', err);
        return error(res, 'Error interno al iniciar sesión.', 500);
    }
};

// OBTENER PERFIL DEL USUARIO ACTUAL
const getProfile = async (req, res) => {
    try {
        const { data: user, error: dbError } = await supabase
            .from('users')
            .select('id, full_name, email, username, role, status, created_at')  // ← AGREGADO username
            .eq('id', req.user.userId)
            .single();

        if (dbError) {
            console.error('Error Supabase:', dbError);
            return error(res, 'Error al obtener perfil.', 500);
        }

        if (!user) {
            return error(res, 'Usuario no encontrado.', 404);
        }

        return success(res, 'Perfil obtenido.', { user });

    } catch (err) {
        console.error('Error obteniendo perfil:', err);
        return error(res, 'Error interno al obtener perfil.', 500);
    }
};

module.exports = {
    register,
    login,
    getProfile
};