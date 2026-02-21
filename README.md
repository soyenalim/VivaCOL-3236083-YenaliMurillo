<p align="center">
  <img src="RESOURCES/GitHub-README-Banner-VivaCOL.png" alt="VivaCol Banner" width="100%">
</p>

#  Viva Colombia | **VivaCOL** 

> Plataforma de Exploración Turística

🇨🇴 VivaCol es un aplicativo web moderno diseñado para centralizar y promover la riqueza turística de Colombia. Este proyecto hace parte del programa de formación de Análisis y Desarrollo de Software del SENA, integrando datos de la API oficial de Colombia con una gestión personalizada de usuarios y favoritos.

![Ubicación](https://img.shields.io/badge/📍_Origen-Colombia-FCD116?style=for-the-badge)
![Institución](https://img.shields.io/badge/🏢_Centro_Nacional_Minero-Programación_de_Software-003893?style=for-the-badge)
![Categoría](https://img.shields.io/badge/📂_Categoría-Turismo_Digital-CE1126?style=for-the-badge)

📖 Tabla de Contenidos
1. Visión General
2. Estructura del Repositorio
3. Diseño y Prototipado
4. Stack Tecnológico
5. Instalación del Entorno
6. Créditos y Bibliografía

# 🌟 Visión General
El proyecto busca resolver la fragmentación de la información turística mediante una interfaz intuitiva y minimalista.
  
````markdown
> 🎯 El Objetivo
  > Centralizar la información turística de Colombia mediante una interfaz intuitiva y minimalista.
````

````markdown
> 🛡️ Diferenciador Técnico
  > Implementación de auditoría (`audit_logs`) y copias de seguridad automáticas para garantizar la integridad absoluta de los datos.
````

# 📂 Estructura del Repositorio
![Last Commit](https://img.shields.io/github/last-commit/soyenalim/VivaCOL-3236083-YenaliMurillo?color=blue&style=flat-square)
![Repo Size](https://img.shields.io/github/repo-size/soyenalim/VivaCOL-3236083-YenaliMurillo?color=green&style=flat-square)

Para garantizar la organización y el control de versiones, el repositorio se divide en las siguientes carpetas:

```text
📁 VivaCol
├── 📁 design           # Planos visuales y wireframes
│   ├── 📁 wireframes   # Diseños de baja fidelidad (Bocetos)
│   └── 📁 inspiration  # Storytelling y recursos visuales
├── 📁 docs             # Documentación técnica y DER
├── 📁 resources        # Identidad corporativa y banners
└── 📄 README.md        # Guía principal del proyecto
````

# 🎨 Diseño y Prototipado
El ecosistema visual de VivaCol prioriza la consistencia y la accesibilidad, asegurando una experiencia de usuario fluida en cada interacción.

## 🗺️ Arquitectura Visual
- Estructura Header & Footer
  - Implementación de una navegación persistente para facilitar la ubicación del usuario en todo momento.
- Módulo de Ayuda Inteligente
  - Sección FAQ integrada directamente en la Landing Page para soporte inmediato (Ítem 10).

## 🚀 Experiencia de Usuario (UX)
- Gestión de Errores Críticos
  - Diseño personalizado de páginas 404 y 500 que mantienen la identidad visual y ofrecen rutas de retorno al inicio.
- Storytelling y Créditos
  - Página "About Us" diseñada para proyectar la visión del proyecto y reconocer las fuentes bibliográficas y tecnológicas.

# 🛠️ Stack Tecnológico

> 🎨 Frontend | Interfaz de usuario centrada en la experiencia, el diseño responsivo y la navegación intuitiva.

| FrontEnd | Propósito y Función |
| :--- | :--- |
| ![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white) | **Framework Principal:** Manejo de rutas, renderizado del lado del servidor (SSR) y optimización de imágenes. |
| ![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB) | **Biblioteca de UI:** Creación de componentes reutilizables para la interfaz de VivaCol. |
| ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white) | **Estilizado:** Diseño responsivo y moderno basado en utilidades, asegurando la identidad corporativa. |

> ☁️ Backend & DB | Gestión de la lógica de servidor y persistencia de datos bajo un modelo relacional.

| BackEnd & DB | Propósito y Función |
| :--- | :--- |
| ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat-square&logo=supabase&logoColor=white) | **Backend as a Service:** Autenticación de usuarios y gestión de API. |
| ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=flat-square&logo=postgresql&logoColor=white) | **Base de Datos:** Almacenamiento relacional de lugares, favoritos y logs. |

> 💻 Lenguajes | Fundamentos del desarrollo utilizados para la construcción de la plataforma.

| Lenguajes | Propósito y Función |
| :--- | :--- |
| ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black) | **Lógica:** Implementación de funciones dinámicas y validaciones. |
| ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white) | **Estructura:** Definición semántica del contenido web. |
| ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white) | **Maquetación:** Personalización visual avanzada. |

> 🛠️ Herramientas | Software y utilitarios que garantizan un entorno de desarrollo estable y un control de versiones seguro.

| Herramientas | Propósito y Función |
| :--- | :--- |
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white) | **Entorno de Ejecución:** Servidor para el desarrollo y despliegue. |
| ![Git](https://img.shields.io/badge/Git-F05033?style=flat-square&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white) | **Versionamiento:** Control de cambios y respaldo en la nube. |
| ![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white) | **Soporte:** Necesario para módulos de compilación nativos. |


# ⚙️ Instalación del Entorno
Para replicar el entorno de desarrollo, se han instalado las siguientes dependencias globales mediante Chocolatey:

Node.js: Entorno de ejecución para el servidor y herramientas de construcción.

Python 3.14.3: Requerido para la compilación de ciertos módulos de Node.js.

Visual Studio Build Tools: Compiladores de C++ necesarios para la integridad de las librerías del proyecto.

# 📚 Créditos y Bibliografía
Este proyecto utiliza recursos de:

API Colombia: Fuente oficial de datos turísticos.

Iconografía: Lucide React / FontAwesome.

Documentación: Storytelling elements basados en guías de diseño moderno.
