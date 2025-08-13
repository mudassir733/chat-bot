import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

// routers
import router from './routes/chat.route';
import authRouter from './routes/auth/auth.route';


const app = express();

// cors
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ["GET", "POST", 'PUT', 'DELETE']
}));

app.use(express.json());

app.use('/api', router);
app.use('/auth', authRouter);


// app.use("/api", require("./routes/chat.route").default);


export { app }
