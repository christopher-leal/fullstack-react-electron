import React from 'react';
import { Link } from 'react-router-dom';
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';
const Pacientes = ({ citas, setConsultar }) => {
	if (citas.length === 0) return null;
	const eliminarCita = (id) => {
		Swal.fire({
			title: 'Estas seguro?',
			text: 'No se podra recuperar el archivo una vez eliminado!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Borrar!'
		}).then(async (result) => {
			if (result.value) {
				const citaEliminada = await clienteAxios.delete(
					`/pacientes/${id}`
				);
				if (citaEliminada.status === 200) {
					setConsultar(true);
					Swal.fire('Correcto', 'Paciente eliminado', 'success');
				} else {
					Swal.fire({
						icon: 'error',
						title: 'Error',
						text: 'Ha ocurrido un error!'
					});
				}
			}
		});
	};
	return (
		<div>
			<h1 className="my-5">Administrador de pacientes</h1>
			<div className="containter mt-5 py-5">
				<div className="row">
					<div className="col-12 mb-5 d-flex justify-content-center">
						<Link
							to={'/nueva'}
							className="btn btn-success text-uppercase py-2 px-5 font-weight-bold"
						>
							Crear cita
						</Link>
					</div>
					<div className="col-md-8 mx-auto">
						<div className="list-group">
							{citas.map((cita) => (
								<div
									className="p-5 list-group-item list-group-item-action "
									key={cita._id}
								>
									<div className="d-flex w-100 justify-content-between">
										<Link
											to={`/cita/${cita._id}`}
											className=""
										>
											<h3 className="mb-3">
												{cita.nombre}
											</h3>
										</Link>
										<small className="fecha-alta">
											{cita.fecha} - {cita.hora}
										</small>
									</div>
									<p className="mb-0">{cita.sintomas}</p>
									<div className="contacto py-3">
										<p>Dueño: {cita.propietario}</p>
										<p>Telefono: {cita.telefono}</p>
									</div>
									<div className="flex-column align-item-end">
										<button
											className="btn btn-danger text-uppercase btn-xs font-weight-bold"
											onClick={() =>
												eliminarCita(cita._id)}
										>
											Eliminar
										</button>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Pacientes;
