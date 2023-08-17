import express  from "express";
import bp from 'body-parser'
import userRouter from './Routers/userRouter.js'
import cors from 'cors'

const app = express();

app.use(express.json({limit:"100mb"}));
app.use(bp.urlencoded({ extended: true,parameterLimit:10000000000,limit:"500mb" }));
// app.use(express.limit(100000000000));
app.use(cors())

app.use('/api/user',userRouter)


export default app;