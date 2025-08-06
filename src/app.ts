import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());


// app.use("/api", require("./routes/chat.route").default);


export { app }
