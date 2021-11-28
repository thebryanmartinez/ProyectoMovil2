const Producto = require('../models/modeloProducto');
const {validationResult} = require('express-validator');
const moment =require('moment');
const msj = require('../componentes/mensaje');
const passport = require('../configs/passport');
const { Op } = require("sequelize");
const { normalizeUnits } = require('moment');
const mensaje = require('../componentes/mensaje');
exports.validarAutenticado = passport.validarAutenticado;

exports.listarProducto = async (req, res) => {
    try
    {
        const producto = await Producto.findAll();
        msj("Peticion procesada correctamente", 200, producto, res);
    }
    catch{
        msj("Ocurrio un error en el servidor", 500, [], res);
    }
};

exports.listarProducto2 = async (req, res) => {
    const producto = await Producto.findAll();
    res.json(producto)
};

exports.listarCamisas = async (req, res) => {
    const { idcategorias } =  req.query;
    if(!idcategorias)
    {
        res.send("Debe enviar la categoria del producto ")
    }else{
    const buscarProducto = await Producto.findAll({
        where: {
            idcategorias: idcategorias
        }
    });
    
    if (!buscarProducto){
        res.send("El categoria no existe");
    }else{
        console.log(buscarProducto);
        res.json(buscarProducto);
    }
    }
};

exports.listarJoggers = async (req, res) => {
    const { idcategorias } =  req.query;
    if(!idcategorias)
    {
        res.send("Debe enviar la categoria del producto ")
    }else{
    const buscarProducto = await Producto.findAll({
        where: {
            idcategorias: idcategorias
        }
    });
    
    if (!buscarProducto){
        res.send("El categoria no existe");
    }else{
        console.log(buscarProducto);
        res.json(buscarProducto);
    }
    }
};

exports.listarSneakers = async (req, res) => {
    const { idcategorias } =  req.query;
    if(!idcategorias)
    {
        res.send("Debe enviar la categoria del producto ")
    }else{
    const buscarProducto = await Producto.findAll({
        where: {
            idcategorias: idcategorias
        }
    });
    
    if (!buscarProducto){
        res.send("El categoria no existe");
    }else{
        console.log(buscarProducto);
        res.json(buscarProducto);
    }
    }
};

exports.listarAccesorios = async (req, res) => {
    const { idcategorias } =  req.query;
    if(!idcategorias)
    {
        res.send("Debe enviar la categoria del producto ")
    }else{
    const buscarProducto = await Producto.findAll({
        where: {
            idcategorias: idcategorias
        }
    });
    
    if (!buscarProducto){
        res.send("El categoria no existe");
    }else{
        console.log(buscarProducto);
        res.json(buscarProducto);
    }
    }
};

exports.buscarProducto = async(req,res) => {
    console.log(req.params);
    const {idproductos}=req.params;
    var mensaje ="";
    const producto = await Producto.findByPk(idproductos);
    console.log(producto);
    res.json(producto);
}


exports.GuardarProducto = async (req, res)=> {
    const validacion=validationResult(req);
    if (!validacion.isEmpty())
    {
        console.log( req.body + validacion.array());
        msj("Los datos ingresados no son validos", 200, validacion.array(),res);
    }
    else
    {
        const { nombre_producto, cantidad_producto, precio_producto, marca_producto, idcategorias, costo} = req.body;
        console.log(req.body);
        if(nombre_producto && cantidad_producto && precio_producto && marca_producto && idcategorias && costo)
        {
            const buscarProducto = await Producto.findOne({
                where:{
                    [Op.or]:{
                        nombre_producto: nombre_producto
                    }
                }
            });
            console.log(buscarProducto);
            if(!buscarProducto){
                await Producto.create({
                    nombre_producto: nombre_producto,
                    cantidad_producto: cantidad_producto,
                    precio_producto: precio_producto,
                    marca_producto: marca_producto,
                    idcategorias: idcategorias,
                    costo: costo,
                }).then((data)=>{
                   msj("Datos procesados correctamente", 200, data, res);
                }).catch((error)=>{
                    msj("Datos procesados incorrectamente", 200, error, res);
                });
            }
            else{
                const mensaje={
                    msj:"El producto ya existe",
                };
                msj("Datos procesados correctamente", 200, mensaje, res);
            }

            
        }
        else
        {
            msj("Faltan algunos datos necesarios para el procesamiento de la petición", 200, [], res);
        }
    }
};



exports.EliminarProducto = async (req, res) => {
    const { idproductos  } =  req.params;
    if(!idproductos )
    {
        res.send("Debe enviar el id del producto ")
    }
    else{
         const buscarProductos = await Producto.findOne({
            where:{
                idproductos : idproductos ,
            } 
         });
         if(!buscarProductos){
             res.send("El producto no existe");
         }
         else{
             await Producto.destroy({
                where:{
                    idproductos :idproductos ,
                }
             }).then((data) => {
                 console.log(data);
                 res.send("El registro ha sido eliminado");
             }).catch((error)=>{
                 console.log(error);
                 res.send("El registro no fue eleminado,porque hay un error en el servidor")
             });
         }
    }
};

exports.ModificarProducto = async (req, res)=> {
    
    const validacion=validationResult(req);
    if (!validacion.isEmpty())
    {
        console.log(validacion.array());
        msj("Los datos ingresados no son validos", 200, validacion.array(),res);
    }
    else
    {
        const { idproductos } = req.query;
        const { nombre_producto, cantidad_producto, precio_producto, marca_producto, idcategorias, costo} = req.body;
        const buscarProducto =await Producto.findOne({
            where:{
                idproductos: idproductos
            }
        });
        console.log(buscarProducto);
        if(!buscarProducto){
            msj("Datos procesados incorrectamente", 200, [], res);
        } 
        else{
                buscarProducto.nombre_producto=nombre_producto;
                buscarProducto.cantidad_producto=cantidad_producto;
                buscarProducto.precio_producto=precio_producto;
                buscarProducto.marca_producto=marca_producto;
                buscarProducto.idcategorias=idcategorias;
                buscarProducto.costo=costo;
                await buscarProducto.save().then((data)=>{
                    console.log(data);
                    msj("Datos procesados correctamente", 200, data, res);
                })
                .catch((error)=>
                {
                    console.log(error);
                    msj("Error al actualizar el registro",200, error, res);
                });
        }
    }
};

exports.ModificarCantidadProducto = async (req, res)=> {
    
    const validacion=validationResult(req);
    if (!validacion.isEmpty())
    {
        console.log(validacion.array());
        msj("Los datos ingresados no son validos", 200, validacion.array(),res);
    }
    else
    {
        const { idproductos } = req.query;
        const { cantidad_producto } = req.body;
        const buscarProducto =await Producto.findOne({
            where:{
                idproductos: idproductos
            }
        });
        console.log(buscarProducto);
        if(!buscarProducto){
            msj("Datos procesados incorrectamente", 200, [], res);
        } 
        else{
                buscarProducto.cantidad_producto=cantidad_producto;
                await buscarProducto.save().then((data)=>{
                    console.log(data);
                    msj("Datos procesados correctamente", 200, data, res);
                })
                .catch((error)=>
                {
                    console.log(error);
                    msj("Error al actualizar el registro",200, error, res);
                });
        }
    }
};