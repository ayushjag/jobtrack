import express from 'express';
import { loginUser, registerUser } from '../controllers/authController.js';

const authrouter = express.Router();

authrouter.post('/register', registerUser);

authrouter.post('/login', loginUser);

export default authrouter;
