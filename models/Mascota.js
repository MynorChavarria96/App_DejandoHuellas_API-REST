const db = require('../config/db');

const Mascota = {
  create: (mascotaData, callback) => {
    const { nombre, especie_id, raza, genero_id, fecha_nacimiento, color, peso, foto, propietario_id, enfermedad_cronica } = mascotaData;
    const query = `
      INSERT INTO mascotas (nombre, especie_id, raza, genero_id, fecha_nacimiento, color, peso, foto, propietario_id, enfermedad_cronica) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(query, [nombre, especie_id, raza, genero_id, fecha_nacimiento, color, peso, foto, propietario_id, enfermedad_cronica], (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result.insertId);
    });
  },
  findMisMascotas: (propietario_id, callback) => {
     
    db.query(`select m.mascota_id, m.nombre, m.especie_id, e.nombre_especie, m.raza, m.genero_id, g.nombre_genero, m.fecha_nacimiento, m.color, m.peso, m.foto, m.enfermedad_cronica
from mascotas m
inner join especies e on e.especie_id = m.especie_id
inner join generos g on g.genero_id = m.genero_id
where m.propietario_id = ?`, [propietario_id], callback);
  }
};

module.exports = Mascota;
