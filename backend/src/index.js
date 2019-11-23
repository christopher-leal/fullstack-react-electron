const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
// creacion del servidor
const app = express();

// habilitar cors para que solo escuche ciertos puertos
// const whiteList = [ 'http://localhost:3000' ];
// const corsOptions = {
// 	origin: (origin, callback) => {
// 		const existe = whiteList.some((dominio) => dominio === origin);
// 		if (existe) {
// 			callback(null, true);
// 		} else {
// 			callback(new Error('No permitido por CORS'));
// 		}
// 	}
// };
// app.use(cors(corsOptions));
app.use(cors());

// conectar a mongodb
mongoose.Promise = global.Promise;
mongoose.connect(
	'mongodb://localhost/veterinaria',
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false
	},
	(err, res) => {
		if (err) throw err;

		console.log('Base de datos online');
	}
);

// habilitar el body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// habilitar routing
app.use(require('./routes'));

// iniciar el servidor
app.listen(3001, () => {
	console.log(`Servidor corriendo en el puerto 3001`);
});
