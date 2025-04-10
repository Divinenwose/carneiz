import express from 'express';
import { signupAdmin, loginAdmin, logoutAdmin } from '../controllers/adminController.js'; 
const router = express.Router();


router.post('/signup', signupAdmin);
router.post('/login', loginAdmin);
router.get('/logout', logoutAdmin);


export default router;
