# SupCrud by Crudzaso

Documentación oficial
**DOCUSAURUS**
```
https://project-firebase-a36d6.web.app
```


## REQUERIMIENTOS `/Back`
- npm: `v10.9.2`
- node.js: `v22.17.0`
- json-server: `v1.0.0-beta.3`

##### Instalación npm & node.js
- **npm & node.js**: `sudo apt install nodejs npm`
- **versiones**: `node.js -> node -v  | npm -> npm -v`

##### Instalación Json-Server
`npm install json-server`
    **o**
`npm i json-server`

- **versión**: `json-server -> json-server --version`
---
## Ejecutar el back `db.json`
#### Ejecutar db.json con Json-server
**1.** Ingresar a la carpeta:
```
    /back/
```
**2.** Dentro de la carpeta ejecutar en siguinente comando en la terminar:
```
    json-server bd.json
```
**o**
```
    npx json-server db.json
```
---
## Estructura del db.json  
JSON - SERVER  
**1. Configuración general** (`config`) → nombre, logo, contacto, redes sociales.  
**2. Usuarios** (`users`) → administración y empleados.  
**3. Categorías y productos** (`categories y products`) → para el catálogo.  
**4. Ventas** (`sales`) → historial de compras y gestión de pedidos.  
**5. Landing page** (`landing_page`) → hero, banners, características, testimonios, newsletter.  
**6. Dashboard** (`dashboard`) → estadísticas, ventas recientes, alertas de stock.  

---
## Folder Structure
     CRUDVENTORY/
     ├── Back/        
     │   ├── models/
     │   │   ├── Product.js
     │   │   └── User.js
     │   ├── utils/
     │   │   ├── alerts.js
     │   │   └── functions.js
     │   ├── db.json
     │   ├── package-lock.json
     │   └── package.json
     ├── Front/
     │   ├── api/
     │   │   └── api
     │   ├── admin/
     │   │   ├── js/
     │   │   │   └── script.js
     │   │   ├── dashboard.css
     │   │   └── dashboard.html
     │   ├── assets/
     │   │   ├── icons/  #Folder to store the icons used in the WebPage
     │   │   ├── users/  #Folder to store user profile Images
     │   │   └── images/ #Folder to sotre images used on the WebPage
     │   ├── css/
     │   │   ├── style.css
     │   ├── js/
     │   │   └── script.js
     │   ├── index.html
     │   ├── log_in.html
     │   ├── sign_up.html
     ├── .gitignore
     ├── index.html  #Redirects to frontend/index.html
     └── README.md


## Ejecutar el servidor express
### Dependencias necesarias
```
    "axios": "^1.13.6",
    "cors": "^2.8.6",
    "dotenv": "^17.3.1",
    "express": "^5.2.1",
    "mysql2": "^3.19.0",
    "node-fetch": "^3.3.2",
    "openai": "^6.26.0"
```
### Crear el ``.env`` con las variables de entorno dentro de `Back/express`
```
.env
```


### Dentro de la carpeta `Back/express` ejecutar:
```
npm install axios cors dotenv express mysql2 node-fetch openai
```