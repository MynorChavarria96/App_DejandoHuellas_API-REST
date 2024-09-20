const db = require('../config/db');

const Reporte = {
  create: (reporteData, callback) => {
    const { nombre_reporta, correo_reporta, fecha_reporta, telefono_reporta, descripcion_adicional, mascota_id } = reporteData;
    db.query(
      'INSERT INTO reporte_encontrados (nombre_reporta, correo_reporta, fecha_reporta, telefono_reporta, descripcion_adicional, mascota_id ) VALUES (?, ?, ?, ?, ?,?)',
      [nombre_reporta, correo_reporta, fecha_reporta, telefono_reporta, descripcion_adicional, mascota_id ],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        callback(null, result.insertId);
      }
    );
  },
 
};

module.exports = Reporte;