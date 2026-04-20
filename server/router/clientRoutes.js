import express from 'express';
import { clientRefreshToken, getClient, loginClient, regClient } from '../controllers/clientController.js';


const clientRoutes = express.Router();

clientRoutes.post('/regClient', regClient)
clientRoutes.post("/loginClient", loginClient)
clientRoutes.post("/clientRefreshToken", clientRefreshToken)
clientRoutes.get("/getClient", getClient)



export default clientRoutes;