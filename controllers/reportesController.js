const Reporte = require('../models/Reportes');

exports.reportar = (req, res) => {
    const { nombre_reporta, correo_reporta, fecha_reporta, telefono_reporta, descripcion_adicional, mascota_id} = req.body;
  
    Reporte.create({ nombre_reporta, correo_reporta, fecha_reporta, telefono_reporta, descripcion_adicional, mascota_id }, (err, reporte_id) => {
        if (err) {
            return res.status(500).json({ error: err.message });
          }
    
          res.status(201).json({ message: 'Registro exitoso', reporte_id });

    });
  };