const express = require('express');
const morgan = require('morgan');
const app = express();
app.set('port',3001);

app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
//app.set('json space' , 2);

app.listen(app.get('port'), () => {
    console.log('Servidor iniciado en el puerto 3001');
});

//Rutas
app.use('/api/',require('./routes/index'));
app.use('/api/usuario/',require('./routes/usuario'));
app.use('/api/producto/',require('./routes/productos'))
app.use('/api/categorias/',require('./routes/Categorias'))
app.use('/api/tallas',require('./routes/Tallas'))
//Hola mundo Bryan que pedos
//HOLA MUNDO
