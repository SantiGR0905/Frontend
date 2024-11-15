### Immersiroom: Plataforma de Visualización Inmersiva de Muebles

**Immersiroom** es una solución innovadora que permite a los usuarios experimentar un entorno virtual inmersivo para visualizar y personalizar muebles en espacios simulados como casas y apartamentos. La plataforma está diseñada para mejorar la experiencia de compra de muebles, optimizando la manera en que los clientes visualizan y configuran productos, ofreciendo opciones de personalización y un asistente inteligente que recomienda muebles según las preferencias del usuario.

**Link al Frontend Desplegado**: https://immersiroom.netlify.app/. 
**Repositorio Frontend**: https://github.com/SantiGR0905/Frontend.
**Repositorio Backend**: https://github.com/SantiGR0905/Retail_and_E-Commerce.
**Link Somee (Backend)**: http://retailspace.somee.com/swagger/index.html.

---

### 1. Estructura y Roles del Sistema

#### Rol de Administrador
El Administrador cuenta con acceso total dentro de Immersiroom y puede:
- **Gestión Completa de Productos**: Puede crear, modificar y eliminar productos, gestionar categorías y usuarios.
- **Control de Seguridad**: Administra los permisos y asegura la protección de los datos sensibles de la plataforma.

#### Rol de Cliente
El Cliente tiene acceso a funcionalidades que le permiten ver los productos y realizar compras:

---

### 2. Funcionalidades de Programación y Seguridad

#### 2.1 Autenticación de Usuarios y Registro Seguro
La plataforma utiliza un sistema de autenticación robusto para proteger a los usuarios:
- **Validación de Credenciales**: Las contraseñas deben cumplir con requisitos de seguridad específicos.
- **Encriptación de Contraseñas**: Se utiliza un algoritmo de hashing para proteger las contraseñas.

#### 2.2 Sistema de Manejo de Roles
Los roles determinan el acceso y permisos de cada usuario:
- **Clientes y Administradores**: Los clientes pueden ver los productos y realizar compras, mientras que los administradores gestionan el sistema.
- **Protección de Endpoints**: Los endpoints se protegen según el rol para garantizar el acceso adecuado.

---

### 3. Funcionalidades del Sistema

#### 3.1 Gestión de Productos y Categorías
- **Creación, Modificación y Eliminación de Productos**: Los administradores tienen acceso a formularios seguros que validan los campos necesarios.


---

### 4. Uso de Entidades y DTOs

#### Uso de DTOs para la Gestión de Productos
- **Control de Exposición de Datos**: Se utilizan DTOs para exponer solo la información necesaria al usuario, minimizando riesgos.
- **Gestión Controlada**: La creación y modificación de productos y pedidos se maneja de manera controlada para evitar inconsistencias.

---

### 5. Auditoría y Seguridad

#### Registro de Eventos en el Backend
El sistema mantiene un registro de eventos relevantes en el backend, capturando acciones como modificaciones de productos, compras y accesos para mantener la trazabilidad y seguridad.
