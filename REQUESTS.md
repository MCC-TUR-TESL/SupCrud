
# Crudventory

Un negocio comercial necesita una solución digital sencilla que le permita administrar su catálogo de productos y mostrarlo de forma pública a sus clientes. El negocio requiere un espacio administrativo desde el cual se puedan gestionar los productos del inventario, definir su estado de disponibilidad y controlar quién tiene acceso a dicha administración.

La aplicación debe contar con un administrador inicial ya registrado, el cual pueda crear nuevos administradores para apoyar la gestión del sistema. El acceso a la interfaz administrativa debe estar protegido mediante una sesión activa, evitando el ingreso de usuarios no autorizados.

Desde el panel administrativo, se debe permitir el registro y gestión de productos, asignando a cada uno un estado que determine su visibilidad y disponibilidad: publicado, borrador o agotado. Estos estados deben influir directamente en la visualización del catálogo público.

La aplicación debe contar con una vista pública (landing) donde los clientes puedan visualizar únicamente los productos que se encuentren en estado publicado. Cada producto visible debe ofrecer un medio de contacto directo a través de WhatsApp, generando un mensaje predefinido que facilite la consulta del producto seleccionado.

La solución debe permitir mantener la información de administradores, productos y estados del inventario de manera persistente, garantizando una experiencia simple, clara y funcional tanto para la administración como para la visualización pública del catálogo.


## Objetivo general

Desarrollar una aplicación web que permita administrar un catálogo de productos y presentarlo de forma pública, facilitando la gestión del inventario, el control de estados de los productos y la comunicación directa con los clientes mediante WhatsApp.

---

## Objetivos específicos por plataforma

### Plataforma administrativa

### Objetivo general de la plataforma administrativa

Permitir la gestión completa del catálogo de productos y el control de acceso administrativo, garantizando que solo usuarios autorizados puedan administrar la información del sistema.

### Objetivos específicos

- Acceder a una interfaz administrativa protegida mediante sesión.
- Visualizar un panel central con la información del inventario.
- Registrar nuevos productos en el sistema.
- Definir y modificar el estado de cada producto:
  - Publicado
  - Borrador
  - Agotado
- Editar la información de los productos registrados.
- Visualizar claramente el estado actual de cada producto.
- Controlar qué productos se encuentran visibles para el público.
- Registrar nuevos administradores desde la interfaz administrativa.
- Visualizar la lista de administradores registrados.
- Cerrar sesión de forma segura desde la plataforma administrativa.

### Qué se espera ver en la plataforma administrativa

- Un panel central de gestión.
- Formularios para el registro de productos.
- Listado completo de productos con su estado visible.
- Opciones para cambiar el estado de los productos.
- Sección para la gestión de administradores.
- Indicadores claros del estado del inventario.

### Qué se espera poder hacer en la plataforma administrativa

- Administrar el catálogo completo de productos.
- Publicar o despublicar productos.
- Marcar productos como agotados.
- Mantener el inventario actualizado.
- Gestionar el acceso administrativo al sistema.

---

## Plataforma pública (Landing)

### Objetivo general de la landing

Presentar un catálogo de productos de forma clara y accesible para los clientes, mostrando únicamente los productos disponibles y facilitando el contacto directo con el negocio.

### Objetivos específicos

- Visualizar un catálogo público de productos.
- Mostrar únicamente los productos en estado publicado.
- Presentar información clara de cada producto:
  - Nombre
  - Precio
- Indicar de forma visual la disponibilidad del producto.
- Facilitar la consulta de productos mediante WhatsApp.

### Qué se espera ver en la landing

- Un listado de productos disponibles.
- Información clara y ordenada de cada producto.
- Un botón de contacto por producto.
- Un diseño simple y fácil de navegar.

### Qué se espera poder hacer en la landing

- Explorar el catálogo de productos.
- Consultar información básica de los productos.
- Contactar al negocio directamente por WhatsApp desde un producto específico.


<img width="1435" height="697" alt="Captura de pantalla 2026-01-19 a la(s) 8 05 59 p m" src="https://gist.github.com/user-attachments/assets/2903c3a8-6981-43d5-a14c-c0cfaced5ef0" />
<img width="1432" height="699" alt="Captura de pantalla 2026-01-19 a la(s) 8 09 26 p m" src="https://gist.github.com/user-attachments/assets/35f7b2f2-edd5-46c1-b08f-3767f2124b7a" />
<img width="1439" height="697" alt="Captura de pantalla 2026-01-19 a la(s) 8 09 05 p m" src="https://gist.github.com/user-attachments/assets/2ffe1548-ba6d-4d4a-a8e0-25efe8a5edbb" />