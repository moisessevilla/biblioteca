-- Verificamos si existe la base de datos biblioteca, si no la creamos.
CREATE DATABASE IF NOT EXISTS biblioteca;
USE biblioteca;

-- Verificamos si existe la tabal usuarios, si no la creamos
DROP TABLE IF EXISTS usuarios;
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefono VARCHAR(20),
    direccion VARCHAR(150)
);librosusuarios

-- Verificamos si existe la tabal libros, si no la creamos
DROP TABLE IF EXISTS libros;
CREATE TABLE libros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    isbn VARCHAR(20) UNIQUE NOT NULL,
    titulo VARCHAR(100) NOT NULL,
    autor VARCHAR(100) NOT NULL,
    editorial VARCHAR(100),
    anio_publicacion INT
);

-- Verificamos si existe la tabla prestamos, si no la creamos
DROP TABLE IF EXISTS prestamos;
CREATE TABLE prestamos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    libro_id INT NOT NULL,
    fecha_prestamo DATETIME NOT NULL,
    fecha_devolucion DATETIME,
    devuelto BOOLEAN DEFAULT 0,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (libro_id) REFERENCES libros(id)
);