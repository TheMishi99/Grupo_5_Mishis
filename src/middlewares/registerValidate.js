const { body } = require("express-validator");
const path  = require("path");
// const userModel = require("../models/user-model");
const db = require("../database/models");

const registerValidate = [
    body('name')
        .notEmpty().withMessage("Debes completar este campo").bail()
        .isLength({ min: 2 }).withMessage("Debes completar con un nombre y apellido válido"),
    body('email')
        .notEmpty().withMessage("Debes completar este campo").bail()
        .isEmail().withMessage("Introduzca una dirección de correo electrónico válida").bail()
        .custom(async (value, {req}) =>{
            let userInDB = await db.Usuarios.findOne({
                where: {
                    email: req.body.email
                }
            })
            if(userInDB){
                throw new Error("El correo electrónico ingresado ya se encuentra registrado")
            }
            return true;
        }),
    body('password')
        .notEmpty().withMessage("Debes completar este campo").bail()
        .isLength({ min: 8 }).withMessage("La contraseña debe tener al menos 8 caracteres")
        .isLength({ max: 20 }).withMessage("La contraseña debe tener como máximo 20 caracteres")
        .matches(/^(?=.*[A-Z]{1,})(?=.*[a-z]{1,})(?=.*\d{1,})(?=.*\W{1,})+/).withMessage('La contraseña debe contener al menos un número, una mayúscula, una minúscula y un carácter especial'),
    body('confirmpassword')
        .notEmpty().withMessage("Debes completar este campo").bail()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Las contraseñas no coinciden")
            }
            return true;
        }),
    body('phonenumber')
        .notEmpty().withMessage("Debes completar este campo").bail()
        .isNumeric().withMessage("Debe ser un número de télefono válido"),
    body('profilePicture')
        .custom((value, { req }) => {
            const file = req.file;
            const acceptedExtensions = ['.jpg','.png','.jpeg','.gif'];
            if (!file) {
                throw new Error("Debes subir una imagen de perfil")
            }else{
                const fileExtension = path.extname(file.originalname);
                if(!acceptedExtensions.includes(fileExtension)){
                    throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`)
                }
            }
            return true;
        }).bail(),
    body('province')
        .custom((value, {req})=> {
            let province = req.body.province
            if(province.length == 0){
                return true
            }else if(province.length<5){
                throw new Error("La provincia ingresada no es válida")
            }
            return true
        }).bail(),
    body('address')
        .custom((value, { req }) => {
            let address = req.body.address
            if (address.length == 0) {
                return true
            } else if (address.length < 5) {
                throw new Error("La dirección ingresada no es válida")
            }
            return true
        }).bail(),
    body('termycond')
        .notEmpty().withMessage("Debes aceptar nuestros términos y condiciones para poder continuar"),
    body('politicPriv')
        .notEmpty().withMessage("Debes aceptar nuestras políticas de privacidad para poder continuar")
]

module.exports = registerValidate;