const express= require('express');
const router= express.Router();
const {body}=require('express-validator');
const userController=require('../controllers/user.controller');
const authMiddleware=require('../middlewares/auth.middleware');



router.post('/register',[
    body('email').isEmail().withMessage('Inavlid email'),
    body('fullname.firstname').isLength({min:3}).withMessage(
        'first name must be of 3 charater long'),
    body('password').isLength({min:6}).withMessage('password must be at least of 6 charter'),
],
userController.registerUser
)

router.post('/login',[
    body('email').isEmail().withMessage('Invalid message'),
    body('password').isLength({min:6}).withMessage('password must be at least of 6 characters')


],
     userController.loginUser
)

router.get('/profile',authMiddleware.authUser,userController.getUserProfile)

router.get('/logout',authMiddleware.authUser,userController.logoutUser)



module.exports=router;