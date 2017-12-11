var express = require('express');
var router = express.Router();
var modelos = require('../../models/index');
var Sequelize = require('sequelize');
var md_auth = require('../../middleware/authenticated');
var moment = require('moment');
/**
 * Vista principal de administracion de boletas 
 * Administrador
 */

router.get('/', md_auth.ensureAuth, function(req, res, next) {
  
modelos.Horario.findAll({
             
        }).then((horario) => {
        
            console.log('\x1b[33m%s\x1b[0m: ',JSON.stringify(horario));
    
        res.render('horario/lista_asignacion_horario_especial', {horario:horario})
    
            })

  });

router.post('/modificar', (req, res) => {

      let updateEmpleado = { 
  
              id_horario : req.body.tipo_horario
              
          };
          modelos.Empleado.update(updateEmpleado, { where: { ndi: req.body.ndi } }).then((result) => {
    
              req.flash('success_msg','Horario del usuario modificado correctamente');
             res.redirect('/horario/lista_asignacion_horario');
  
          })
  
          });
/*
router.get('/editar/:id_horario', (req, res) => {

  modelos.sequelize.query('select e.id, e.ndi , e.paterno, e.materno, e.nombres, h.descripcion, ca.cargo, a.desc_area from public."Empleados" e, public."Horarios" h, public."Contratos" c, public."Cargos" ca, public."Areas" a where e.id_horario = h.id and c.id_empleado = e.id and c.id_cargo= ca.id and ca.id_area=a.id and e.id='+req.params.id_horario).spread((horario, metadata) => {
   
      modelos.Horario.findAll({
   
    
     }).then((combo_horario) => {

      res.render('horario/asignar_horario', {horario:horario, combo_horario:combo_horario})

           })
  })

});*/

module.exports = router;