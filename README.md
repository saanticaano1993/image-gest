# image-gest

1- Descripción del proyecto:

Se realiza una aplicación para gestionar imagenes.

Para ello se crea una aplicacion web que permite crear un usuario para poder gestionar imagenes.

El usuario puede crear una cuenta con nombre de usuario email y contraseña.

Una vez creada la cuenta el usuario podra loguearse y acceder a la aplicación.

Al loguearse el usuario accede a un dashboard donde se muestran sus imagenes.Podra navegar entre ellas, editar los títulos y borrar imagenes.

También podrá buscar haciendo uso del buscador por palabras que filtraran los títulos de las imagenes.

Se implementa la funcionalidad para ordenar los resultados por : tamaño y fecha de subida.

En la parte superior se encuentra la barra de navegación fija desde la que se acceden a las siguientes secciones:

a-Dashboard 
b-Subir imagen(acceso al formulario de subida de imagenes)
c-Perfil(podrá actualizar su información de usuario(username y contraseña) y realizar el Logout.


2-Guía de instalación y testing 

a)Running app

Paso 1: Realizar un git clone del repositorio del proyecto.
Paso 2: Abrir 4 terminales 
Paso 3: En la primera Situarse en el directorio del proyecto
Paso 4: En la priera Situarse en el directorio  Backend
Paso 5 : En la primera Ejecutar el siguiente comando npm install
Paso 6: En la primera Ejecutar el siguiente comando npm run dev 
Paso 7: En la segunda Situarse en el directorio frontend
Paso 8 : En la segunda Ejecutar el siguiente comando npm install
Paso 9:  En la segunda Ejecutar el siguiente comando npm run dev 
Paso 10 : Abrir un navegdor y entrar en la dirección que nos aparece en la segunda consola


a)Testing app
Paso 1: En la tercera terminal situarse en el directorio Backend 
Paso 2 : Ejecutar el comando npm run test 
Paso 3 : Con las terminales 1 y 2 abiertas situarse con la cuarta terminal en el directorio frontend
Paso 4 ; ejecutar en la cuarta terminal el comando npm run test:terminal
Paso 5 : Modificar el fichero /frontend/src/pages/__tests__/Register.cy.ts cambiando el username y el email aumentando en 1 la numerología final.
Ejemplo TestNew14 por TestNew15 y test-profle14@test.com por test-profle15@test.com



3-Tecnologías utilizadas y estructura del proyecto:

Analizando las necesidades del proyecto se opta por montar una arquitecura front-end / api-rest.

Backend:
Se opta por implementar una RestFull-Api desarrollada en Typescript por su robusted y seguridad.

Se utilizan las siguientes tecnologías :

# Express - Se utliza como Web Application framework para manejar solicitudes http y routing
# JSON Web Token - Se utiliza para la autenticación y el control de sesión
# MongoDB - Se utiliza como BBDD no sql por su rapidez y flexibilidad 
# Testing - Se utiliza Jest y  Supertest para el testing del Api-Rest

FrontEnd:

Se utilizan las siguientes tecnologías :

# React Js - Se utiliza React Js para contruir el FrontEnd por su flexibilidad, capacidad de reutilización de componentes y su dinamismo que mejora 
notablemente la experiencia de usuario gracias a su optimización que aplica la filosfía SOLID.
# React Query - Se utiliza para obtener y alamacenar datos en cache y para almacenar los state de la app
# Axios - Se utiliza junto con React Query para realizar la comunicación con el server 
# Testing - Se utiliza Cypress para implementar el testing del front-end


 






