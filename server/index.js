import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import route from "./routes/posts.js";
import userRoute from "./routes/users.js";
import passport from "passport";
import middlewaree from './middleware/passport.js'
import 'dotenv/config'

const app = express()
app.use(cors())
middlewaree(passport)
app.use(passport.initialize())
app.use(bodyParser.json({
    limit: "30mb",
    extended: "true"
}))

app.use(bodyParser.urlencoded({
    limit: "30mb",
    extended: "true"
}))




const CONNECTIONI_URL = process.env.DB
const port = process.env.PORT || 5001
mongoose.connect(CONNECTIONI_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => app.listen(port, () => console.log(`MongoDb conncted and listening successfully at port ${port}`)))
    .catch((error) => console.log(error.message))
app.use('/tenders', route)
app.use('/', userRoute)
