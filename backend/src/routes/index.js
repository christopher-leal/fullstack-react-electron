const express = require('express');
const router = express.Router();
const {
	nuevoCliente,
	obtenerPacientes,
	obtenerPaciente,
	actualizarPaciente,
	eliminarPaciente
} = require('../controllers/pacienteController');

// agregar nuevos pacientes
router.post('/pacientes/nuevo', nuevoCliente);
// obtener todos los registros
router.get('/pacientes', obtenerPacientes);
// obtener un paciente en especifico
router.get('/pacientes/:id', obtenerPaciente);
// editar a un paciente en especifico
router.put('/pacientes/:id', actualizarPaciente);
// eliminar a un paciente en especifico
router.delete('/pacientes/:id', eliminarPaciente);

module.exports = router;
