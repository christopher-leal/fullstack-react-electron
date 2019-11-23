import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Pacientes from './components/Pacientes';
import NuevaCita from './components/NuevaCita';
import Cita from './components/Cita';
import clienteAxios from './config/axios';
function App() {
	const [ citas, setCitas ] = useState([]);
	const [ consultar, setConsultar ] = useState(true);
	useEffect(
		() => {
			const getPacientes = async () => {
				const pacientes = await clienteAxios.get('/pacientes');
				setCitas(pacientes.data);
				setConsultar(false);
			};
			if (consultar) {
				getPacientes();
			}
		},
		[ consultar ]
	);
	return (
		<Router>
			<Switch>
				<Route
					exact
					path="/"
					render={() => (
						<Pacientes citas={citas} setConsultar={setConsultar} />
					)}
				/>
				<Route
					exact
					path="/nueva"
					render={() => <NuevaCita setConsultar={setConsultar} />}
				/>
				<Route
					exact
					path="/cita/:id"
					render={({ match }) => {
						let { id } = match.params;
						const cita = citas.filter((cita) => cita._id === id);
						return <Cita cita={cita[0]} />;
					}}
				/>
			</Switch>
		</Router>
	);
}

export default App;
