# 📌 API Documentation – Viva COL 

Base URL:
http://localhost:5000/api

---

## 🔐 AUTH ROUTES

### 📝 Register User

**POST** /auth/register

Headers:
Content-Type: application/json

Body:
{
  "full_name": "string",
  "email": "string",
  "username": "string",
  "password": "string",
  "role": "turista | admin"
}

Responses:

201 – Usuario registrado exitosamente
400 – Datos incompletos
409 – Email o username ya registrado
500 – Error interno

---

### 🔑 Login User

**POST** /auth/login

Headers:
Content-Type: application/json

Body:
{
  "email": "string",
  "password": "string"
}

Responses:

200 – Login exitoso
401 – Credenciales incorrectas
403 – Usuario desactivado
500 – Error interno

---

### 👤 Get Profile

**GET** /auth/profile

Headers:
Authorization: Bearer TOKEN

Responses:

200 – Perfil obtenido
401 – Token inválido
404 – Usuario no encontrado
500 – Error interno

---

## 👥 USERS ROUTES

### 📄 Get All Users

**GET** /users

Headers:
Authorization: Bearer TOKEN (admin)

Responses:

200 – Lista de usuarios obtenida
401 – Token inválido
403 – Acceso denegado (no es admin)
500 – Error interno

---

### 🔎 Get User by ID

**GET** /users/:id

Headers:
Authorization: Bearer TOKEN

Responses:

200 – Usuario encontrado
404 – Usuario no encontrado
401 – Token inválido
500 – Error interno

---

### ✏ Update User

**PUT** /users/:id

Headers:
Authorization: Bearer TOKEN

Body:
{
  "full_name": "string",
  "email": "string",
  "username": "string",
  "role": "turista | admin"
}

Responses:

200 – Usuario actualizado
400 – Datos inválidos
404 – Usuario no encontrado
409 – Email o username ya en uso
401 – Token inválido
403 – Acceso denegado
500 – Error interno

---

### 🗑 Soft Delete User

**DELETE** /users/:id

Headers:
Authorization: Bearer TOKEN (admin)

Descripción:
No elimina el usuario físicamente.
Cambia el campo "status" a false.

Responses:

200 – Usuario desactivado
404 – Usuario no encontrado
401 – Token inválido
403 – Acceso denegado
500 – Error interno

---

## 📍 PLACES ROUTES

### 📄 Get All Places

**GET** /places

Responses:

200 – Lista de lugares obtenida
500 – Error interno

---

### 🔎 Get Place by ID

**GET** /places/:id

Responses:

200 – Lugar encontrado
404 – Lugar no encontrado
500 – Error interno

---

### ➕ Create Place

**POST** /places

Headers:
Authorization: Bearer TOKEN (admin)

Body:
{
  "name": "string",
  "description": "string",
  "location": "string"
}

Responses:

201 – Lugar creado
400 – Datos inválidos
401 – Token inválido
403 – Acceso denegado
500 – Error interno

---

### ✏ Update Place

**PUT** /places/:id

Headers:
Authorization: Bearer TOKEN (admin)

Responses:

200 – Lugar actualizado
404 – Lugar no encontrado
401 – Token inválido
403 – Acceso denegado
500 – Error interno

---

### 🗑 Delete Place

**DELETE** /places/:id

Headers:
Authorization: Bearer TOKEN (admin)

Responses:

200 – Lugar eliminado
404 – Lugar no encontrado
401 – Token inválido
403 – Acceso denegado
500 – Error interno

---

## 🔐 Autenticación

La autenticación se realiza mediante JWT.

El token debe enviarse en el header:

Authorization: Bearer TOKEN

Duración del token:
24 horas

---

## 📊 Códigos HTTP utilizados

200 – Operación exitosa  
201 – Recurso creado  
400 – Datos inválidos  
401 – No autenticado  
403 – No autorizado  
404 – Recurso no encontrado  
409 – Conflicto (duplicados)  
500 – Error interno del servidor  

---

## 🧠 Reglas de negocio implementadas

- Validación de email y username únicos.
- Normalización de email y username (trim + lowercase).
- Encriptación de contraseñas con bcrypt.
- Soft delete de usuarios (status = false).
- Bloqueo de login para usuarios desactivados.
- Control de roles (admin / turista).