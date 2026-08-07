import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { serviceOrderRoutes } from '../domains/ordens/ordens.routes';
import { authRoutes } from "../domains/auth/auth.routes";
import { clientRoutes } from '../domains/clients/clients.routes';

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/service-orders", serviceOrderRoutes);
app.use("/clients", clientRoutes)
export { app };

// import express  from "express";
// const app = express();
// app.get("/", (req, res) => {
//   res.send("API funcionando!");
// });
// export { app };