const { body } = require("express-validator");
const path  = require("path");

const registerValidate = [
    body('name')
        .notEmpty().withMessage("Debes completar este campo").bail()
        .isLength({ min: 5 }).withMessage("Debes completar con un nombre y apellido válido"),
    body('email')
        .notEmpty().withMessage("Debes completar este campo").bail()
        .isEmail().withMessage("Introduzca una dirección de correo electrónico válida"),
    body('password')
        .notEmpty().withMessage("Debes completar este campo").bail()
        .isLength({ min: 8 }).withMessage("La contraseña debe tener al menos 8 caracteres"),
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
    body('termycond')
        .notEmpty().withMessage("Debes aceptar nuestros términos y condiciones para poder continuar"),
    body('politicPriv')
        .notEmpty().withMessage("Debes aceptar nuestras políticas de privacidad para poder continuar")
]

module.exports = registerValidate;