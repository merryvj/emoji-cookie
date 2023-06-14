import "./loadEnvironment.js";
import { MongoClient } from 'mongodb';
import express from 'express';
import cors from 'cors';
import fortunes from "./routes/emojis.js"


const app = new express();
const PORT = process.env.PORT || 5050;

const corsOptions = {
  origin: 'https://cookie-front.onrender.com'
  //origin:"http://localhost:3000"
}

app.use(cors(corsOptions));
app.use(express.json());

app.use("/fortune", fortunes);


app.listen(PORT, (
  console.log("started server")
));