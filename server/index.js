import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import ConnectDB from "./config/db.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import AdminRouter from "./router/adminRoutes.js";
import productRouter from "./router/productRoutes.js";
import clientRoutes from "./router/clientRoutes.js";
import orderRoutes from "./router/orderRoutes.js";



dotenv.config();
const app = express();
ConnectDB()
app.use(cors({
    origin: "*"
}));
app.use(express.json());

app.use("/stylehub", AdminRouter)
app.use("/stylehub", productRouter)
app.use("/uploads", express.static("uploads"));
app.use("/stylehub", clientRoutes)
app.use("/stylehub", orderRoutes)

app.use(errorMiddleware)

app.listen(process.env.PORT, () => console.log(`server running on ${process.env.PORT}`)
) 