const { Router } = require('express');
const router = Router();
const controladorProducto = require('../../controllers/controladorProducto');
const controladorAutenticacion= require('../../controllers/autenticacion');

router.get('/listar', controladorAutenticacion.validarAutenticado,controladorProducto.listarProducto);


router.post('/guardar',
body('nombre_producto').isLength({min:3}).withMessage('La longitud minima de la categoria es de 3 caracteres'),
body('marca_producto').isLength({min:3}).withMessage('La longitud minima de la categoria es de 3 caracteres'),
param('idcategorias').isEmpty().withMessage('No se permiten campos vacios'),
param('idtallas').isEmpty().withMessage('No se permiten campos vacios'),
controladorAutenticacion.validarAutenticado,controladorProducto.GuardarProducto);

router.put('/modificar',
param('idproductos').isEmpty().withMessage('No se permiten campos vacios')
.not().isInt().withMessage('El Id debe ser un numero entero'),
body('nombre_producto').isLength({min:3}).withMessage('La longitud minima de la categoria es de 3 caracteres'),
body('marca_producto').isLength({min:3}).withMessage('La longitud minima de la categoria es de 3 caracteres'),
param('idcategorias').isEmpty().withMessage('No se permiten campos vacios'),
param('idtallas').isEmpty().withMessage('No se permiten campos vacios'),
controladorAutenticacion.validarAutenticado,controladorProducto.ModificarProducto);

router.delete('/:idproductos',controladorAutenticacion.validarAutenticado, controladorProducto.EliminarProducto);

module.exports=router;
