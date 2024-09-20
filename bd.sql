-- Crear base de datos
CREATE DATABASE mascotas_db;
USE mascotas_db;

-- Crear tabla de usuarios
CREATE TABLE usuarios (
    usuario_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_usuario VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    contraseña VARCHAR(255) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Crear tabla de propietarios
CREATE TABLE propietarios (
    propietario_id INT AUTO_INCREMENT PRIMARY KEY,
    nombres VARCHAR(50) NOT NULL,
    apellidos VARCHAR(50) NOT NULL,
    direccion VARCHAR(100),
    telefono VARCHAR(15),
    usuario_id INT,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(usuario_id)
);


CREATE TABLE especies (
    especie_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_especie VARCHAR(50) NOT NULL UNIQUE
);
CREATE TABLE generos (
    genero_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_genero VARCHAR(50) NOT NULL
);

-- Crear tabla de mascotas
CREATE TABLE mascotas (
    mascota_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    especie_id INT,
    raza VARCHAR(50),
    genero_id INT,
    fecha_nacimiento DATE,
    color VARCHAR(50),
    peso DECIMAL(5, 2),
    foto VARCHAR(255) NOT NULL, 
    propietario_id INT,
    enfermedad_cronica VARCHAR(255) DEFAULT 'No tiene',
    activo tinyint DEFAULT 1,
    identificador_qr VARCHAR(255),
    FOREIGN KEY (propietario_id) REFERENCES propietarios(propietario_id),
    FOREIGN KEY (especie_id) REFERENCES especies(especie_id),
	FOREIGN KEY (genero_id) REFERENCES generos(genero_id)
);

CREATE TABLE ubicaciones (
    ubicacion_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    latitud DECIMAL(17,14) NOT NULL,
    longitud DECIMAL(17,14) NOT NULL,
    descripcion_adicional TEXT,
    mascota_id INT NOT NULL,
    FOREIGN KEY (mascota_id) REFERENCES mascotas(mascota_id)
);

INSERT INTO especies (nombre_especie) VALUES
('Perro'),
('Gato'),
('Otro')
;
INSERT INTO generos (nombre_genero) VALUES
('Macho'),
('Hembra');
