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
CREATE TABLE `mascotas` (
  `mascota_id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `especie_id` int DEFAULT NULL,
  `raza` varchar(50) DEFAULT NULL,
  `genero_id` int DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `color` varchar(50) DEFAULT NULL,
  `peso` decimal(5,2) DEFAULT NULL,
  `foto` varchar(255) NOT NULL,
  `propietario_id` int DEFAULT NULL,
  `enfermedad_cronica` varchar(255) DEFAULT 'No tiene',
  `activo` tinyint DEFAULT '1',
  `identificador_qr` varchar(255) DEFAULT NULL,
  `desaparecido` tinyint DEFAULT '0',
  PRIMARY KEY (`mascota_id`),
  KEY `propietario_id` (`propietario_id`),
  KEY `especie_id` (`especie_id`),
  KEY `genero_id` (`genero_id`),
  CONSTRAINT `mascotas_ibfk_1` FOREIGN KEY (`propietario_id`) REFERENCES `propietarios` (`propietario_id`),
  CONSTRAINT `mascotas_ibfk_2` FOREIGN KEY (`especie_id`) REFERENCES `especies` (`especie_id`),
  CONSTRAINT `mascotas_ibfk_3` FOREIGN KEY (`genero_id`) REFERENCES `generos` (`genero_id`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `reporte_desaparecidos` (
  `reporteD_id` int NOT NULL AUTO_INCREMENT,
  `fecha_desaparicion` date NOT NULL,
  `hora_desaparicion` time NOT NULL,
  `descripcion_desaparicion` text,
  `ubicacionid_desaparicion` int NOT NULL,
  `mascotaid_desaparicion` int NOT NULL,
  PRIMARY KEY (`reporteD_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `reporte_encontrados` (
  `reporte_id` int NOT NULL AUTO_INCREMENT,
  `fecha_reporta` date DEFAULT NULL,
  `nombre_reporta` varchar(150) NOT NULL,
  `correo_reporta` varchar(100) DEFAULT NULL,
  `telefono_reporta` varchar(15) NOT NULL,
  `descripcion_reporta` varchar(255) DEFAULT NULL,
  `ubicacion_id` int DEFAULT NULL,
  `mascota_id` int DEFAULT NULL,
  PRIMARY KEY (`reporte_id`),
  KEY `mascota_id` (`mascota_id`),
  KEY `ubicacion_id` (`ubicacion_id`),
  CONSTRAINT `reporte_encontrados_ibfk_1` FOREIGN KEY (`mascota_id`) REFERENCES `mascotas` (`mascota_id`),
  CONSTRAINT `reporte_encontrados_ibfk_2` FOREIGN KEY (`ubicacion_id`) REFERENCES `ubicaciones` (`ubicacion_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE ubicaciones (
    ubicacion_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    latitud DECIMAL(17,14) NOT NULL,
    longitud DECIMAL(17,14) NOT NULL,
    descripcion_adicional TEXT,
    mascota_id INT NOT NULL,
    FOREIGN KEY (mascota_id) REFERENCES mascotas(mascota_id)
);

create table vacunacion(
id_vacunacion Int AUTO_INCREMENT PRIMARY KEY,
medicamento nvarchar(200) not null,
dosis nvarchar(25) null,
descripcion_adicional text null,
fecha_aplicacion date not null,
proxima_fecha_aplicacion date null,
nombre_veterinario nvarchar(250),
id_mascota Int,
FOREIGN KEY (id_mascota) REFERENCES mascotas(mascota_id)
);
INSERT INTO especies (nombre_especie) VALUES
('Perro'),
('Gato'),
('Otro')
;
INSERT INTO generos (nombre_genero) VALUES
('Macho'),
('Hembra');

--triger para colocar como desaparecido
DELIMITER //
CREATE TRIGGER update_mascota_desaparecida
AFTER INSERT ON reporte_desaparecidos
FOR EACH ROW
BEGIN
    UPDATE mascotas
    SET desaparecido = 1
    WHERE mascota_id = NEW.mascotaid_desaparicion;
END//

DELIMITER ;

DELIMITER //
CREATE TRIGGER update_mascota_encontrada
AFTER INSERT ON reporte_encontrados
FOR EACH ROW
BEGIN
    UPDATE reporte_desaparecidos
    SET activo = 0
    WHERE mascotaid_desaparicion= NEW.mascota_id;
END//

DELIMITER ;
