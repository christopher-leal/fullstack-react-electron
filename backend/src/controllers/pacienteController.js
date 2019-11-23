// cuando se crea un nuevo cliente
const Paciente = require('../models/Paciente');

const nuevoCliente = async (req, res, next) => {
	try {
		const paciente = new Paciente(req.body);
		await paciente.save();
		res.json({ mensaje: 'Registro agregado' });
	} catch (error) {
		res.json({ error });
		next();
	}
	// insertar en la base de datos
	// res.json({ mensaje: 'Cliente agregado correctamente' });
};
const obtenerPacientes = async (req, res, next) => {
	try {
		const pacientes = await Paciente.find({});
		res.json(pacientes);
	} catch (error) {
		res.json(error);
		next();
	}
	// insertar en la base de datos
	// res.json({ mensaje: 'Cliente agregado correctamente' });
};
const obtenerPaciente = async (req, res, next) => {
	let { id } = req.params;
	try {
		const paciente = await Paciente.findById(id);
		res.json(paciente);
	} catch (error) {
		res.json(error);
		next();
	}
	// insertar en la base de datos
	// res.json({ mensaje: 'Cliente agregado correctamente' });
};
const actualizarPaciente = async (req, res, next) => {
	let { id } = req.params;
	try {
		const paciente = await Paciente.findOneAndUpdate(
			{ _id: id },
			req.body,
			{
				new: true
			}
		);
		res.json(paciente);
	} catch (error) {
		res.json(error);
		next();
	}
};

const eliminarPaciente = async (req, res, next) => {
	let { id } = req.params;
	try {
		const paciente = await Paciente.findOneAndDelete({ _id: id });
		res.json({
			mensaje: 'Paciente eliminado',
			paciente
		});
	} catch (error) {
		res.json(error);
		next();
	}
};
module.exports = {
	nuevoCliente,
	obtenerPacientes,
	obtenerPaciente,
	actualizarPaciente,
	eliminarPaciente
};
