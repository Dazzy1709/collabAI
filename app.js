import express from "express";
import cors from "cors";
import router from "./src/backend/routes/auth.routes.js";

const app = express();


app.use(cors());
app.use(express.json());

app.use('/auth', router);


export default app;


