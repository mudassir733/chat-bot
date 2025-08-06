import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

// routers
import router from './routes/chat.route';


const app = express();
app.use(express.json());

app.use("/api", router);


// app.use("/api", require("./routes/chat.route").default);


export { app }
