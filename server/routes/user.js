const express = require('express')
const { use } = require('express/lib/router')
const {check,expressValidate} = require('express-validator')
const mult = require('multer');
const upload = mult()


const router= express.Router()
const userController = require('../controllers/userController')

//Router
router.get('/',userController.view);
router.post('/',userController.find);

router.get('/adduser',userController.form);
router.post('/adduser',upload.array(),[check('first_name','This is must be 3 char long').exists().isLength({min:3})],userController.create);
router.get('/edituser/:id',userController.edit)
router.post('/edituser/:id',userController.update)
router.get('/viewall/:id',userController.viewall)

router.get('/:id',userController.delete);
 
module.exports =  router;