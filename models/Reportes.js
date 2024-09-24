const db = require('../config/db');

const Reporte = {
  createRA: (reporteData, callback) => {
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

  findReportesDesaparecidos: (callback) => {
    db.query(`SELECT m.mascota_id, m.foto, m.nombre, m.raza, rd.fecha_desaparicion, m.identificador_qr
    FROM mascotas_db.reporte_desaparecidos rd
    inner join mascotas_db.mascotas m on m.mascota_id = rd.mascotaid_desaparicion
    where m.desaparecido = 1
    order by rd.fecha_desaparicion desc`,  callback);
  },
 
};

module.exports = Reporte;