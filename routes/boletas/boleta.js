var express = require('express');
var router = express.Router();
var modelos = require('../../models/index');
var moment = require('moment');
const bcrypt = require('bcrypt-nodejs');

// Consultas de boletas por empleado
router.get('/formulario', function(req, res, next) {

  //cambiar el id de entrada ya que es el de usuario y se necesita el de empleado
  modelos.sequelize.query('SELECT tb.id, tb.tipo_boleta FROM public."Empleados" e, public."Contratos" c, public."Tipo_Empleados" te, public."Tipo_empleado_boleta" teb, public."Tipo_boleta" tb WHERE e.id = c.id_empleado and c.id_empleado= te.id and c.id_tipo_empleado=teb.id_tipo_empleado and  teb.id_tipo_boleta=tb.id and c.id_empleado='+res.locals.user.id).spread((Tipo_boleta, metadata) => {
  res.render('boleta/boleta',{Tipo_boleta:Tipo_boleta});
  })
  });

    router.post('/reporte', (req, res) => {
      
            const fecha_solicitud = moment().format("YYYY-MM-DD"+" 00:00:00.000 +00:00");
            const observacion = '';
            const estado = 'PENDIENTE';
            const fecha_inicio = req.body.fecha_inicio;
            const  fecha_fin = req.body.fecha_fin;
            const id_empleado = res.locals.user.id;
            const id_tipo_boleta= req.body.tipo_boleta;
            const suma_dias =  moment(fecha_fin).diff(moment(fecha_inicio),"days");
            const horas= moment.duration(req.body.hora_fin- req.body.hora_inicio).humanize(); 
            const estado_vacacion='f';

            console.log( moment.duration(fecha_fin - fecha_inicio).humanize() + ' between meals' ) 
            console.log('horassss'+horas)

if(fecha_inicio<fecha_fin){

  if(req.body.tipo_boleta==1 || req.body.tipo_boleta==2)
  {
         modelos.sequelize.query('SELECT sum(dias)vacacion_dias FROM public."Saldo_Vacacions" WHERE id_empleado='+res.locals.user.id+'and prescrito_estado = false GROUP BY id_empleado').spread((sumatoria, metadata) => {

          if(suma_dias<=Number(sumatoria[0].vacacion_dias))
          {
              modelos.Boleta.create({
              fecha_solicitud : fecha_solicitud,
              observacion : observacion,
              estado :estado,
              fecha_inicio : fecha_inicio,
              fecha_fin : fecha_fin,
              id_empleado : id_empleado,
              id_tipo_boleta: id_tipo_boleta,
      
            })
            .then(newboleta => { 
                modelos.sequelize.query('SELECT te.tipo_boleta, e.ndi,e.paterno, e.materno, e.nombres, c.cargo, a.desc_area  FROM public."Tipo_boleta" te, public."Empleados" e, public."Cargos" c, public."Areas" a where e.id='+id_empleado+' and te.id='+id_tipo_boleta+' and c.id_area=a.id').spread((datos_boleta, metadata) => {
                res.render('boleta/reporte',{boleta:datos_boleta,boleta_insertada:newboleta,variable:suma_dias});
                });
            })
          }
          else
          {
              req.flash('error_msg1','No puede pedir ese tiempo de vacación');
              res.redirect('/boleta/formulario');
          }
   
        });
  }
else
{       modelos.Boleta.create({
        fecha_solicitud : fecha_solicitud,
        observacion : observacion,
        estado :estado,
        fecha_inicio : fecha_inicio,
        fecha_fin : fecha_fin,
        id_empleado : id_empleado,
        id_tipo_boleta: id_tipo_boleta,

      })
      .then(newboleta => { 
          modelos.sequelize.query('SELECT te.tipo_boleta, e.ndi,e.paterno, e.materno, e.nombres, c.cargo, a.desc_area  FROM public."Tipo_boleta" te, public."Empleados" e, public."Cargos" c, public."Areas" a where e.id='+id_empleado+' and te.id='+id_tipo_boleta+' and c.id_area=a.id').spread((datos_boleta, metadata) => {
          res.render('boleta/reporte',{boleta:datos_boleta,boleta_insertada:newboleta,variable:suma_dias});
          });
      })
  }
}
else{
  req.flash('error_msg','La fecha inicio no puede ser mayor a la fecha fin');
  res.redirect('/boleta/formulario');
  }
              //res.json('boleta/boleta');
  });
      

  module.exports = router;


