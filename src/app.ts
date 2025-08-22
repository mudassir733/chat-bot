import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import session from "express-session";
import './config/passport';
dotenv.config();

// routers
import router from './routes/chat.route';
import authRouter from './routes/auth/auth.route';
import chatListRouter from './routes/chatList/chatList.route';


const app = express();

// cors
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ["GET", "POST", 'PUT', 'DELETE']
}));

app.use(session({
    secret: `${process.env.SESSION_SECRET}`,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));

app.use(express.json());

app.use('/api', router);
app.use('/auth', authRouter);
app.use('/api', chatListRouter);


// app.use("/api", require("./routes/chat.route").default);


export { app }
