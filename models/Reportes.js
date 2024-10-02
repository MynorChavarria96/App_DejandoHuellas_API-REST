const db = require('../config/db');

const Reporte = {
  //Reporte Apariciones
  createRA: (reporteData, callback) => {
    const { nombre_reporta, correo_reporta, fecha_reporta, telefono_reporta, descripcion_reporta, ubicacion_id, mascota_id } = reporteData;

    db.query(
      'INSERT INTO reporte_encontrados (nombre_reporta, correo_reporta, fecha_reporta, telefono_reporta, descripcion_reporta, ubicacion_id, mascota_id ) VALUES (?, ?, ?, ?, ?,?,?)',
      [nombre_reporta, correo_reporta, fecha_reporta, telefono_reporta, descripcion_reporta, ubicacion_id, mascota_id],
      (err, result) => {
        if (err) {
          return callback(err);  // Si ocurre un error, el callback solo retorna el error
        }

        // Si la inserción fue exitosa, devuelve un objeto con status y message
        const response = {
          status: 201,  // Código 201 para creación exitosa
          message: 'Reporte creado con éxito',
          id: result.insertId  // Devuelve el ID del nuevo reporte
        };

        callback(null, response);  // Devuelve el objeto de respuesta en caso de éxito
      }
    );
  },
  deleteReport: (mascota_id, callback) => {
    const query = `
        UPDATE reporte_desaparecidos rd
        INNER JOIN mascotas m ON rd.mascotaid_desaparicion = m.mascota_id
        SET rd.activo = 0,  
        m.desaparecido = 0  
        WHERE m.mascota_id = ? 
    `;

    db.query(query, mascota_id, (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result.affectedRows);
    });
  },

  //Reporte Desaparecidos
  createRD: (reporteData, callback) => {
    const { fecha_desaparicion, hora_desaparicion, descripcion_desaparicion, ubicacionid_desaparicion, mascotaid_desaparicion } = reporteData;

    // Consulta para verificar si ya existe un reporte activo para la mascota
    db.query(
      'SELECT * FROM reporte_desaparecidos WHERE mascotaid_desaparicion = ? AND activo = 1',
      [mascotaid_desaparicion],
      (err, results) => {
        if (err) {
          return callback({ status: 500, message: 'Error en la base de datos', error: err });
        }

        // Si se encuentra un reporte activo, se retorna un error
        if (results.length > 0) {
          console.log('Ya existe un reporte activo para esta mascota'); // <-- Esto es para verificar en la consola del servidor
          return callback({ status: 400, message: 'Ya existe un reporte activo para esta mascota.' });
        }

        // Si no existe, se procede a insertar el nuevo reporte
        db.query(
          'INSERT INTO reporte_desaparecidos (fecha_desaparicion, hora_desaparicion, descripcion_desaparicion, ubicacionid_desaparicion, mascotaid_desaparicion) VALUES (?, ?, ?, ?, ?)',
          [fecha_desaparicion, hora_desaparicion, descripcion_desaparicion, ubicacionid_desaparicion, mascotaid_desaparicion],
          (err, result) => {
            if (err) {
              return callback({ status: 500, message: 'Error al insertar el reporte', error: err });
            }
            callback(null, { status: 201, message: 'Reporte creado exitosamente', id: result.insertId });
          }
        );
      }
    );
  },

  findReportesDesaparecidos: (callback) => {
    db.query(`   SELECT m.mascota_id, m.foto, m.nombre, m.raza, rd.fecha_desaparicion, rd.hora_desaparicion, 
       rd.descripcion_desaparicion, m.identificador_qr, u.nombre as nombre_ubicacion, 
       u.descripcion_adicional as descripcion_ubicacion, u.latitud, u.longitud, rd.activo
FROM mascotas_db.reporte_desaparecidos rd
INNER JOIN mascotas_db.mascotas m 
    ON m.mascota_id = rd.mascotaid_desaparicion
INNER JOIN mascotas_db.ubicaciones u 
    ON u.ubicacion_id = rd.ubicacionid_desaparicion
INNER JOIN (
    SELECT mascotaid_desaparicion, MAX(fecha_desaparicion) AS max_fecha
    FROM mascotas_db.reporte_desaparecidos
    GROUP BY mascotaid_desaparicion
) rd_max 
    ON rd.mascotaid_desaparicion = rd_max.mascotaid_desaparicion 
    AND rd.fecha_desaparicion = rd_max.max_fecha
WHERE m.desaparecido = '1'
ORDER BY rd.fecha_desaparicion DESC`, callback);
  },
  //and rd.activo = '1'
};

module.exports = Reporte;