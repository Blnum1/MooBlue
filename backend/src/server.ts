import dotenv from 'dotenv';
dotenv.config();


import express from "express";
import cors from "cors";
import helmet from "helmet";  // เพิ่มการใช้ helmet เพื่อความปลอดภัย
import porkRouter from './routers/pork.router';
import userRouter from './routers/user.router';
import orderRouter from './routers/order.router';
import { dbConnect } from './configs/database.config';
dbConnect();

const app = express();

app.use(helmet());  // เพิ่มการใช้ helmet
app.use(express.json());
app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}));

app.use("/api/porks", porkRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

// กำหนด static files สำหรับ production
if (process.env.NODE_ENV === 'production') {
    const path = require('path');
    app.use(express.static(path.join(__dirname, '../frontend/build')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'));
    });
  }
  
  // Error handling middleware
  app.use((err: any, req: any, res: any, next: any) => {
    console.error(err.stack);
    res.status(500).send({ message: "An unexpected error occurred", error: err.message });
  });
  
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
      console.log("Website served on http://localhost:" + port);
  });
  
