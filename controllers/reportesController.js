const Reporte = require('../models/Reportes');

exports.reportar = (req, res) => {
    const { nombre_reporta, correo_reporta, fecha_reporta, telefono_reporta, descripcion_adicional, mascota_id} = req.body;
  
    Reporte.createRA({ nombre_reporta, correo_reporta, fecha_reporta, telefono_reporta, descripcion_adicional, mascota_id }, (err, reporte_id) => {
        if (err) {
            return res.status(500).json({ error: err.message });
          }
    
          res.status(201).json({ message: 'Registro exitoso', reporte_id });

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