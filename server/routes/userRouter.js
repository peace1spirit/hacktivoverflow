const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const helpers = require('../helpers/images')
const { isLogin } = require('../middleware/isLogin');

router.post('/register', helpers.multer.single('imagefile'), helpers.sendUploadToGCS, UserController.register)
//router.post('/register', UserController.register)

router.post('/login', UserController.login)

router.post('/google', UserController.googlelogin)

router.put('/',isLogin, UserController.userUpdate)

router.get('/',isLogin ,UserController.getuser)

module.exports = router;
