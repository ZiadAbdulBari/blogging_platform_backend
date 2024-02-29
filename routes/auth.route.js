import express from 'express';
import { login, registration } from '../controllers/auth.controller.js';
const route = express.Router();

route.post('/registration',registration);
route.post('/login',login);

export default route;