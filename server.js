import dotenv from 'dotenv'
import mongoose from "mongoose";
import app from './app.js'

dotenv.config();


mongoose.connect(process.env.URI, {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useUnifiedTopology: true
}).then(() => console.log('MongoDB connection established.')).catch((error) => console.error("MongoDB connection failed:", error.message))

const port = process.env.PORT

// User.findOneAndDelet({phone:"6354441260"})

app.listen(port,()=>{
    console.log(`App Running on port ${port}`)
})