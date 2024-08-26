const Especies = require('../models/Especies');
const Generos = require('../models/Generos');
const Mascota = require('../models/Mascota');

exports.getEspeciesAll = (req,res) => {
    Especies.findEspecies((err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (result.length === 0) {
        return res.status(404).send({ message: 'No hay especies' });
      }
      res.send(result);
    });
  };

  exports.getGenerosAll = (req,res) => {
    Generos.findGeneros((err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (result.length === 0) {
        return res.status(404).send({ message: 'No hay generos' });
      }
      res.send(result);
    });
  };

  exports.createMascota = (req, res) => {
    const { nombre, especie_id, raza, genero_id, fecha_nacimiento, color, peso, foto, propietario_id, enfermedad_cronica } = req.body;
  
    const mascotaData = {
      nombre,
      especie_id,
      raza,
      genero_id,
      fecha_nacimiento,
      color,
      peso,
      foto,
      propietario_id,
      enfermedad_cronica: enfermedad_cronica || 'No tiene' // Valor por defecto si no se proporciona
    };
  
    Mascota.create(mascotaData, (err, mascotaId) => {
      if (err) {
        return res.status(500).json({ error: 'Error al registra mascota' });
      }
      res.status(201).json({ message: 'Mascota registrada con éxito', mascotaId });
    });
  };

  exports.createubicacion = (req, res) => {
    const { nombre, latitud, longitud, descripcion_adicional, mascota_id } = req.body;
  
    const ubicacionData = {
      nombre, latitud, longitud, descripcion_adicional, mascota_id
    };
  
    Mascota.createUbicacion(ubicacionData, (err, ubicacionId) => {
      if (err) {
        return res.status(500).json({ error: 'Error al registrar ubicacion' });
      }
      res.status(201).json({ message: 'Ubicacion registrada con éxito', ubicacionId });
    });
  };


  exports.getMisMascotas = (req,res) => {
    const propietario_id = req.params.propietario_id;
    Mascota.findMisMascotas(propietario_id,(err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (result.length === 0) {
        return res.status(404).send({ message: 'No hay Mascotas' });
      }
      res.send(result);
    });
  };

  exports.getMascotabyQr = (req,res) => {
    const identificador_qr = req.params.identificador_qr;
    Mascota.findbyQr(identificador_qr,(err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (result.length === 0) {
        return res.status(404).send({ message: 'No se encontró la mascota' });
      }
      res.send(result);
    });
  };

  exports.updateMascota = (req, res) => {
    const mascota_id = req.params.mascota_id;
    const mascotaData = req.body;
  
    Mascota.update(mascota_id, mascotaData, (err, affectedRows) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (affectedRows === 0) {
        return res.status(404).send({ message: 'Mascota no encontrada o no actualizada' });
      }
      res.status(200).send({ message: 'Mascota actualizada con éxito' });
    });
  };
  exports.deleteMascota = (req, res) => {
    const mascota_id = req.params.mascota_id;
    
    Mascota.delete(mascota_id, (err, affectedRows) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (affectedRows === 0) {
        return res.status(404).send({ message: 'Mascota no encontrada o no eliminada' });
      }
      res.status(200).send({ message: 'Mascota eliminada con éxito' });
    });
  };