# Aplicación de Películas

Esta es una aplicación web desarrollada en Laravel que permite añadir, editar y eliminar películas y sus respectivos directores mediante FETCH.

## Características

- Filtrado de películas por orden alfabético o director
- Aañadir películas (título, director, año y calificación)
- Añadir directores


![1](screenshots/1.jpg)


![2](screenshots/2.jpg)


![3](screenshots/3.jpg)


## Instalación

Sigue estos pasos para descargar y configurar el repositorio:

1. Clona el repositorio:

    ```sh
    git clone https://github.com/aluqmor/userApp.git
    ```

2. Navega al directorio del proyecto:

    ```sh
    cd tu-repositorio
    ```

3. Instala las dependencias de Composer:

    ```sh
    composer install
    ```

4. Copia el archivo database.sql y crea la base de datos junto con usuario y contraseña.

5. Cambia el nombre de `.env.example` a `.env`.

6. Configura tu base de datos en el archivo `.env`:

    ```env
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=nombre_de_tu_base_de_datos
    DB_USERNAME=tu_usuario
    DB_PASSWORD=tu_contraseña
    ```
    
7. Genera la clave de la aplicación:

    ```sh
    php artisan key:generate
    ```

8. Ejecuta las migraciones para crear las tablas necesarias:

    ```sh
    php artisan migrate
    ```
