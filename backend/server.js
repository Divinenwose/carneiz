import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import productRouter from "./routes/productRoute.js"
import userRouter from "./routes/userRoute.js"
import cookieParser from "cookie-parser";
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js";
import adminRoutes from './routes/adminRoute.js';


import dotenv from "dotenv";


dotenv.config();
const app = express()
const port = 4000

app.use(cookieParser());
app.use(express.json())
app.use(cors({
    origin: ['https://carneiz.org', 'https://www.carneiz.org', 'https://admin.carneiz.org', 'https://api.carneiz.org'], 
  }));
  

connectDB();

app.use("/api/product",productRouter)
app.use("/images", express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order", orderRouter);
app.use("/api/admin",adminRoutes)


app.get("/", (req,res)=>{ 
    res.send("API Working")
})

app.listen(port, ()=>{
    console.log(`Server Started on http://localhost:${port}`)
})


