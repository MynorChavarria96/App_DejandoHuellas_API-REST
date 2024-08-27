const db = require('../config/db');
const crypto = require('crypto');

const Mascota = {
  create: (mascotaData, callback) => {
    const { nombre, especie_id, raza, genero_id, fecha_nacimiento, color, peso, foto, propietario_id, enfermedad_cronica } = mascotaData;

    // Generar el identificador QR
    const identificador_qr = crypto.randomBytes(16).toString('hex');

    const query = `
      INSERT INTO mascotas (nombre, especie_id, raza, genero_id, fecha_nacimiento, color, peso, foto, propietario_id, enfermedad_cronica, identificador_qr) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(query, [nombre, especie_id, raza, genero_id, fecha_nacimiento, color, peso, foto, propietario_id, enfermedad_cronica, identificador_qr], (err, result) => {
      if (err) {
        return callback(err);
      }
      
      callback(null, result.insertId);
    });
  },
  createUbicacion:(ubicacionData, callback) => {
    const { nombre, latitud, longitud, descripcion_adicional, mascota_id} = ubicacionData;

    const query = `
      INSERT INTO ubicaciones (nombre, latitud, longitud, descripcion_adicional, mascota_id) 
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(query, [ nombre, latitud, longitud, descripcion_adicional, mascota_id], (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result.insertId);
    });
  },
  findMisMascotas: (propietario_id, callback) => {

    db.query(`select m.mascota_id, m.nombre, m.especie_id, e.nombre_especie, m.raza, m.genero_id, g.nombre_genero, m.fecha_nacimiento,
       m.color, m.peso, m.foto, m.enfermedad_cronica, m.identificador_qr
    from mascotas m
    inner join especies e on e.especie_id = m.especie_id
    inner join generos g on g.genero_id = m.genero_id
    where m.propietario_id = ? and activo = 1` , [propietario_id], callback);
  },
  findbyQr: (identificador_qr, callback) => {

    db.query(`select m.nombre, e.nombre_especie, m.raza, g.nombre_genero, m.fecha_nacimiento, m.color, m.peso, m.foto, m.enfermedad_cronica,
concat(p.nombres, ' ', p.apellidos)as propietario, p.direccion as residencia, p.telefono, u.email as correo
from mascotas m
inner join especies e on e.especie_id = m.especie_id
inner join generos g on g.genero_id = m.genero_id
inner join propietarios p on m.propietario_id= p.propietario_id
inner join usuarios u on p.usuario_id = u.usuario_id
where m.identificador_qr = ?` , [identificador_qr], callback);
  },

  update: (mascota_id, mascotaData, callback) => {
    const { nombre, especie_id, raza, genero_id, fecha_nacimiento, color, peso, foto, propietario_id, enfermedad_cronica } = mascotaData;
    const query = `
      UPDATE mascotas 
      SET nombre = ?, especie_id = ?, raza = ?, genero_id = ?, fecha_nacimiento = ?, color = ?, peso = ?, foto = ?, propietario_id = ?, enfermedad_cronica = ?
      WHERE mascota_id = ? 
    `;

    db.query(query, [nombre, especie_id, raza, genero_id, fecha_nacimiento, color, peso, foto, propietario_id, enfermedad_cronica, mascota_id], (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result.affectedRows);
    });
  },
  delete: (mascota_id, callback) => {
    const query = `
         UPDATE mascotas 
      SET activo = 0
      WHERE mascota_id = ? 
    `;

    db.query(query, mascota_id, (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result.affectedRows);
    });
  },

};

module.exports = Mascota;
