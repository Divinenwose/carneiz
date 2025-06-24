import express from 'express';
import { body, validationResult } from 'express-validator';
import { signupAdmin, loginAdmin, logoutAdmin, resendOtp, verifyOtp } from '../controllers/adminController.js'; 


const router = express.Router();

const validateSignup = [
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters')
      .matches(/\d/)
      .withMessage('Password must contain a number')
      .matches(/[A-Z]/)
      .withMessage('Password must contain an uppercase letter')
      .matches(/[\W_]/)
      .withMessage('Password must contain a special character'),
  ];
  

  const validateLogin = [
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').notEmpty().withMessage('Password cannot be empty'),
  ];

router.post('/signup', validateSignup, signupAdmin);
router.post('/login', validateLogin, loginAdmin);
router.get('/logout', logoutAdmin);
router.post("/resend-otp", resendOtp);
router.post('/verify-otp', verifyOtp);


export default router;
