import express from 'express';
import { AdminLogin, AdminReg, refreshToken } from '../controllers/adminController.js';


const AdminRouter = express.Router()

AdminRouter.post("/AdminReg", AdminReg)
AdminRouter.post("/AdminLogin", AdminLogin)
AdminRouter.post("/refreshToken", refreshToken)

export default AdminRouter