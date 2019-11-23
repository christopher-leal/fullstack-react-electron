import React, { useState } from 'react';
import clienteAxios from '../config/axios';
import { Link, withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';

const NuevaCita = ({ history, setConsultar }) => {
	const [ cita, setCita ] = useState({
		nombre: '',
		propietario: '',
		fecha: '',
		hora: '',
		sintomas: '',
		telefono: ''
	});
	const [ error, setError ] = useState(false);
	const updateState = (e) => {
		setCita({
			...cita,
			[e.target.name]: e.target.value
		});
	};
	const nuevaCita = async (e) => {
		e.preventDefault();
		if (
			cita.nombre.trim() === '' ||
			cita.propietario.trim() === '' ||
			cita.fecha.trim() === '' ||
			cita.hora.trim() === '' ||
			cita.telefono.trim() === '' ||
			cita.sintomas.trim() === ''
		) {
			setError(true);
			Swal.fire({
				icon: 'error',
				title: 'Error',
				text: 'Todos los campos son obligatorios!'
			});

			return;
		}
		const nuevaCita = await clienteAxios.post('/pacientes/nuevo', cita);
		if (nuevaCita.status === 200) {
			history.push('/');
			setConsultar(true);
			Swal.fire('Correcto', 'Cita creada correctamente', 'success');

			// console.log(history);
		}
	};
	return (
		<div>
			<div className="col-12 mb-5 d-flex justify-content-center">
				<Link
					to={'/'}
					className="btn btn-success text-uppercase py-2 px-5 font-weight-bold"
				>
					Volver
				</Link>
			</div>

			<form className="bg-white p-5 bordered" onSubmit={nuevaCita}>
				<div className="form-group">
					<label htmlFor="nombre">Nombre Mascota</label>
					<input
						type="text"
						className="form-control form-control-lg"
						id="nombre"
						name="nombre"
						placeholder="Nombre Mascota"
						value={cita.nombre}
						onChange={updateState}
					/>
				</div>

				<div className="form-group">
					<label htmlFor="propietario">Nombre Propietario</label>
					<input
						type="text"
						className="form-control form-control-lg"
						id="propietario"
						name="propietario"
						placeholder="Nombre Propietario"
						value={cita.propietario}
						onChange={updateState}
					/>
				</div>

				<div className="form-group">
					<label htmlFor="telefono">Teléfono</label>
					<input
						type="tel"
						className="form-control form-control-lg"
						id="telefono"
						name="telefono"
						placeholder="Teléfono"
						value={cita.telefono}
						onChange={updateState}
					/>
				</div>

				<div className="form-group">
					<label htmlFor="fecha">Fecha Alta</label>
					<input
						type="date"
						className="form-control form-control-lg"
						id="fecha"
						name="fecha"
						value={cita.fecha}
						onChange={updateState}
					/>
				</div>

				<div className="form-group">
					<label htmlFor="hora">Hora Alta</label>
					<input
						type="time"
						className="form-control form-control-lg"
						id="hora"
						name="hora"
						value={cita.hora}
						onChange={updateState}
					/>
				</div>

				<div className="form-group">
					<label htmlFor="sintomas">Síntomas</label>
					<textarea
						className="form-control"
						name="sintomas"
						rows="6"
						value={cita.sintomas}
						onChange={updateState}
					/>
				</div>

				<input
					type="submit"
					className="btn btn-primary mt-3 w-100 p-3 text-uppercase font-weight-bold"
					value="Crear Cita"
				/>
			</form>
		</div>
	);
};

export default withRouter(NuevaCita);
