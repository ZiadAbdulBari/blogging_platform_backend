import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
import 'dotenv/config'
app.use(cors());

app.listen(4000,()=>{
    console.log("Server is running.");
});
