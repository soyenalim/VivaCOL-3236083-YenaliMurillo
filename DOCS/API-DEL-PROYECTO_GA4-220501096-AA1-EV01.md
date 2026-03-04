# Evidencia API del Proyecto
**Código:** GA4-220501096-AA1-EV01  
**Estudiante:** Yenali Karina Murillo Rodriguez    
**Fecha:** [Agrega fecha]  
**Repositorio:** [VivaCOL](https://github.com/soyenalim/VivaCOL-3236083-YenaliMurillo)

---

## 1. Resumen

API REST desarrollada con **Node.js + Express** que implementa:
- ✅ CRUD completo de usuarios con autenticación JWT
- ✅ CRUD de lugares turísticos (productos/servicios)
- ✅ Integración con API Colombia para datos geográficos
- ✅ Gestión de favoritos por usuario
- ✅ Base de datos PostgreSQL via Supabase

**Herramienta de testing:** Talend API Tester (15 pruebas realizadas)

---

## 2. Tecnologías y Arquitectura

### Stack Tecnológico
| Capa | Tecnología |
|------|-----------|
| Runtime | Node.js v20.x |
| Framework | Express.js |
| Base de datos | PostgreSQL (Supabase) |
| Autenticación | JWT + bcryptjs |
| HTTP client | Talend API Tester |

### Estructura del Backend
```markdown
backend/
├── src/
│   ├── config/          # Conexión Supabase
│   ├── controllers/     # authController, userController, placeController
│   ├── middleware/      # auth.js (JWT verification)
│   ├── routes/          # auth.js, users.js, places.js, colombia.js
│   └── utils/           # response.js (formato JSON estándar)
├── tests/               # 15 pruebas con evidencias
└── server.js            # Punto de entrada
```

---

## 3. Endpoints Implementados

### 🔐 Autenticación
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/auth/register` | Registro de usuario |
| POST | `/api/auth/login` | Login y obtención de JWT |

### 👤 Usuarios (JWT requerido)
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/users` | Listar todos |
| GET | `/api/users/:id` | Obtener por ID |
| POST | `/api/users` | Crear usuario |
| PUT | `/api/users/:id` | Actualizar usuario |
| DELETE | `/api/users/:id` | Desactivar usuario (soft delete) |

### 🏛️ Lugares (JWT requerido)
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/places` | Listar lugares turísticos |
| GET | `/api/places/:id` | Obtener lugar específico |
| POST | `/api/places` | Crear lugar |
| PUT | `/api/places/:id` | Actualizar lugar |
| DELETE | `/api/places/:id` | Eliminar lugar |

### 🌎 API Colombia (Datos externos)
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/colombia/departments` | 33 departamentos |
| GET | `/api/colombia/department/:id/cities` | Ciudades por departamento |
| GET | `/api/colombia/search?query=` | Búsqueda de lugares |

### ⭐ Favoritos (JWT requerido)
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/colombia/favorites` | Guardar favorito |
| GET | `/api/colombia/favorites/my` | Listar mis favoritos |

---

## 4. Testing y Evidencias

### Resumen de Pruebas (15 total)

| Categoría | Cantidad | Estado |
|-----------|----------|--------|
| Health Check | 1 | ✅ 100% |
| Autenticación | 4 | ✅ 75% (1 error controlado) |
| CRUD Usuarios | 5 | ✅ 100% |
| API Colombia | 3 | ✅ 100% |
| Favoritos | 2 | ✅ 100% |

### Evidencias Detalladas

#### 4.1 Health Check
| # | Prueba | Resultado | Evidencia |
|---|--------|-----------|-----------|
| 01 | GET `/` - API funcionando | ✅ 200 OK | ![01](RESOURCES/01-health-check.png) |

#### 4.2 Autenticación JWT
| # | Prueba | Resultado | Evidencia |
|---|--------|-----------|-----------|
| 02 | Registro usuario duplicado | ❌ 500 Error | ![02](RESOURCES/02-register-error.png) |
| 03 | Registro nuevo usuario | ✅ 201 Created | ![03](RESOURCES/03-register-success.png) |
| 04 | Login credenciales válidas | ✅ 200 OK + JWT | ![04](RESOURCES/04-login-success.png) |
| 05 | Login credenciales inválidas | ❌ 401 Unauthorized | ![05](RESOURCES/05-login-fail.png) |

**Nota:** El error 500 en prueba 02 demuestra necesidad de mejora en manejo de duplicados (validación previa).

#### 4.3 CRUD Usuarios (Soft Delete Implementado)
| # | Prueba | Resultado | Evidencia |
|---|--------|-----------|-----------|
| 06 | GET `/api/users` - Listar todos | ✅ 200 OK | ![06](RESOURCES/06-users-list.png) |
| 07 | GET `/api/users/3` - Obtener usuario | ✅ 200 OK | ![07](RESOURCES/07-user-get.png) |
| 08 | PUT `/api/users/3` - Actualizar | ✅ 200 OK | ![08](RESOURCES/08-user-update.png) |
| 09 | DELETE `/api/users/3` - Desactivar | ✅ 200 OK | ![09](RESOURCES/09-user-delete.png) |
| 10 | GET `/api/users/3` - Verificar estado | ✅ 200 OK (status: false) | ![10](RESOURCES/10-user-verify.png) |

**Implementación:** DELETE realiza eliminación lógica (auditoría preservada).

#### 4.4 Datos Geográficos
| # | Prueba | Resultado | Evidencia |
|---|--------|-----------|-----------|
| 11 | GET departamentos (33 total) | ✅ 200 OK | ![11](RESOURCES/11-departments.png) |
| 12 | GET ciudades departamento 1 | ✅ 200 OK (11 ciudades) | ![12](RESOURCES/12-cities.png) |
| 13 | Búsqueda "medellin" | ✅ 200 OK (0 resultados) | ![13](RESOURCES/13-search.png) |

#### 4.5 Gestión de Favoritos
| # | Prueba | Resultado | Evidencia |
|---|--------|-----------|-----------|
| 14 | POST crear favorito | ✅ 201 Created | ![14](RESOURCES/14-favorite-create.png) |
| 15 | GET listar favoritos | ✅ 200 OK | ![15](RESOURCES/15-favorites-list.png) |

---

## 5. Buenas Prácticas Aplicadas

| Práctica              | Implementación                                         |
| --------------------- | ------------------------------------------------------ |
| **MVC**               | Separación controllers/routes/config                   |
| **JWT**               | Tokens con expiración, middleware de verificación      |
| **Seguridad**         | bcryptjs para passwords, variables en .env             |
| **Respuestas JSON**   | Formato estandarizado: `{success, message, data}`      |
| **Soft Delete**       | Eliminación lógica preservando auditoría               |
| **CORS**              | Habilitado para comunicación frontend-backend          |
| **Manejo de errores** | Try-catch en controladores con respuestas consistentes |

Ejemplo: Formato de Respuesta Estándar

```JavaScript
// utils/response.js
const successResponse = (res, data, message = 'Success') => {
    return res.status(200).json({
        success: true,
        message,
        data
    });
};

const errorResponse = (res, message = 'Error', statusCode = 500) => {
    return res.status(statusCode).json({
        success: false,
        message,
        data: null
    });
};
```

---

## 6. Ejecución del Proyecto

```bash
# 1. Clonar repositorio
git clone https://github.com/soyenalim/VivaCOL-3236083-YenaliMurillo.git

# 2. Configurar backend
cd VivaCOL/backend
npm install

# 3. Configurar variables de entorno (.env)
cp .env.example .env
# Editar: SUPABASE_URL, SUPABASE_KEY, JWT_SECRET

# 4. Iniciar servidor
npm start
# o modo desarrollo: npm run dev

# 5. Verificar funcionamiento
curl http://localhost:5000/
# Respuesta esperada: "VivaCOL API funcionando correctamente"
```

## 7. Conclusión y Notas al Evaluador

| Requisito                              | Estado                | Evidencia                      |
| -------------------------------------- | --------------------- | ------------------------------ |
| CRUD Usuarios (POST, GET, PUT, DELETE) | ✅ Completo            | Pruebas 03-10                  |
| CRUD Productos/Servicios (places)      | ✅ Completo            | Endpoints documentados         |
| Autenticación JWT                      | ✅ Implementada        | Pruebas 02-05                  |
| Testing con herramienta REST           | ✅ 15 pruebas          | Carpeta `tests/` + screenshots |
| Interacción con base de datos          | ✅ Supabase/PostgreSQL | Configuración documentada      |
| Buenas prácticas Node.js               | ✅ Aplicadas           | Sección 5                      |

### 🌟 Hallazgos y Mejoras Futuras
- Manejo de errores 500: Implementar validación previa para evitar intentos de registro con email duplicado (prueba 02).
- Búsqueda case-insensitive: Mejorar endpoint de búsqueda para que "medellin" encuentre "Medellín" (prueba 13).
- Paginación: Agregar paginación a endpoints de listado para grandes volúmenes de datos.
### 🏆 Contexto del Proyecto
Esta API es el backend de VivaCOL, aplicación turística del SENA. El frontend (Next.js) consume estos endpoints para:
- Registro/login de turistas y administradores
- Gestión de lugares turísticos favoritos
- Exploración de datos geográficos de Colombia
