fetch('http://localhost:3001/pacientes')
	.then((result) => result.json())
	.then((res) => {
		mostrarCitas(res);
	});

const mostrarCitas = (citas) => {
	const contenedorCitas = document.querySelector('#citas');
	let citasHtml = '';
	citas.map((cita) => {
		citasHtml += `<div
				class="p-5 list-group-item list-group-item-action "
			>
				<div class="d-flex w-100 justify-content-between">
					<a href={/cita/${cita._id}}>
						<h3 class="mb-3">${cita.nombre}</h3>
					</a>
					<small class="fecha-alta">
						${cita.fecha} - ${cita.hora}
					</small>
				</div>
				<p class="mb-0">${cita.sintomas}</p>
				<div class="contacto py-3">
					<p>Dueño: ${cita.propietario}</p>
					<p>Telefono: ${cita.telefono}</p>
				</div>
				<div class="flex-column align-item-end">
					<button
						class="btn btn-danger text-uppercase btn-xs font-weight-bold"
					>
						Eliminar
					</button>
				</div>
			</div>
		    `;
	});
	contenedorCitas.innerHTML = citasHtml;
};
