const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const supabase = require('../config/supabase');
const { success, error } = require('../utils/response');

// REGISTRO DE USUARIOS
const register = async (req, res) => {
    try {
        let { full_name, email, username, password, role = 'turista' } = req.body;

        // Normalizar datos
        full_name = full_name?.trim();
        email = email?.trim().toLowerCase();
        username = username?.trim().toLowerCase();
        password = password?.trim();

        // Validaciones básicas
        if (!full_name || !email || !username || !password) {
            return error(res, 'Todos los campos son obligatorios.', 400);
        }

        if (password.length < 6) {
            return error(res, 'La contraseña debe tener mínimo 6 caracteres.', 400);
        }

        // 1️ Validar email único
        const { data: existingUsers, error: emailError } = await supabase
            .from('users')
            .select('id')
            .eq('email', email);

        if (emailError) {
            console.error('Error verificando email:', emailError);
            return error(res, 'Error verificando email.', 500);
        }

        if (existingUsers.length > 0) {
            return error(res, 'El email ya está registrado.', 409);
        }

        // 2️ Validar username único
        const { data: existingUsernames, error: usernameError } = await supabase
            .from('users')
            .select('id')
            .eq('username', username);

        if (usernameError) {
            console.error('Error verificando username:', usernameError);
            return error(res, 'Error verificando username.', 500);
        }

        if (existingUsernames.length > 0) {
            return error(res, 'El username ya está en uso.', 409);
        }

        // 3️ Encriptar contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // 4️ Insertar usuario
        const { data: newUser, error: dbError } = await supabase
            .from('users')
            .insert([
                { full_name, email, username, password: hashedPassword, role }
            ])
            .select()
            .single();

        if (dbError) {
            console.error('Error de Supabase:', dbError);
            return error(res, 'Error al crear usuario en base de datos.', 500);
        }

        // 5️ Generar JWT
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
                username: newUser.username,
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
        let { email, password } = req.body;

        // Normalizar datos
        email = email?.trim().toLowerCase();
        password = password?.trim();

        if (!email || !password) {
            return error(res, 'Email y contraseña son obligatorios.', 400);
        }

        // 1️ Buscar usuario por email
        const { data: users, error: dbError } = await supabase
            .from('users')
            .select('*')
            .eq('email', email);

        if (dbError) {
            console.error('Error buscando usuario:', dbError);
            return error(res, 'Error interno al buscar usuario.', 500);
        }

        if (users.length === 0) {
            return error(res, 'Usuario o contraseña incorrectos.', 401);
        }

        const user = users[0];

        // Verificar que el usuario esté activo
        if (user.status === false) {
            return error(res, 'Usuario desactivado. Contacte al administrador.', 403);
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