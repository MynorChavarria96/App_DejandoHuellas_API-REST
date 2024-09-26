const Reporte = require('../models/Reportes');
const Mascota = require('../models/Mascota');

exports.reportar = (req, res) => {
    const { nombre_reporta, correo_reporta, fecha_reporta, telefono_reporta, descripcion_adicional, mascota_id} = req.body;
  
    Reporte.createRA({ nombre_reporta, correo_reporta, fecha_reporta, telefono_reporta, descripcion_adicional, mascota_id }, (err, reporte_id) => {
        if (err) {
            return res.status(500).json({ error: err.message });
          }
    
          res.status(201).json({ message: 'Registro exitoso', reporte_id });

    });
  };
//Reporte Desaparecidos
  exports.reportarD = (req, res) => {
    const { 
      fecha_desaparicion,
      hora_desaparicion,
      descripcion_desaparicion,
      latitud,
      longitud,
      nombreUbicacion,
      descripcionUbicacion,
      mascotaid_desaparicion
    } = req.body;
    
    const ReporteData = {
      fecha_desaparicion,
      hora_desaparicion,
      descripcion_desaparicion,
      mascotaid_desaparicion
    };
  
    const ubicacionData = {
      nombre: nombreUbicacion,
      latitud,
      longitud,
      descripcion_adicional: descripcionUbicacion,
    };

    
  // Inserta la ubicación primero
  Mascota.createUbicacion(ubicacionData, (err, ubicacionId) => {
    if (err) {
      return res.status(500).json({ error: 'Error al insertar ubicación' });
    }


    // Agrega el ID de la ubicación al objeto mascota
    ReporteData.ubicacionid_desaparicion = ubicacionId;

    // Luego inserta la mascota
    Reporte.createRD(ReporteData, (err, reporteId) => {
      if (err) {
        return res.status(500).json({ error: 'Error al crear reporte', err });
      }

      // Responde con éxito si todo salió bien
      res.status(201).json({ message: 'Reporte creado', reporteId });
    });
  });
    
  };


  exports.getReporteDesaparecidos = (req, res) => {
    Reporte.findReportesDesaparecidos( (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (result.length === 0) {
        return res.status(404).send({ message: 'No hay Reportes' });
      }
      res.send(result);
    });
  };