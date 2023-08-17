import dotenv from 'dotenv'
import mongoose from "mongoose";
import app from './app.js'

dotenv.config();


mongoose.connect("mongodb+srv://reviewCardPanthil:L0phtCrack@l0phtcrackcluster.prn9rqz.mongodb.net/ReviewCard?retryWrites=true&w=majority", {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useUnifiedTopology: true
}).then(() => console.log('MongoDB connection established.')).catch((error) => console.error("MongoDB connection failed:", error.message))

const port = process.env.PORT

// User.findOneAndDelet({phone:"6354441260"})

app.listen(port,()=>{
    console.log(`App Running on port ${port}`)
})