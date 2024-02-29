import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import limiter from "./middleware/rateLimiter.js";
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
import 'dotenv/config'
app.use(cors());
app.use(limiter)
import auth from './routes/auth.route.js';

app.use('/api/v1/auth/',auth);


app.listen(4000,()=>{
    console.log("Server is running.");
});
