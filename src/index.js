
import dotenv from "dotenv";



import connectDB from './db/index.js';
import app from "./app.js";



dotenv.config({path: "/.env"})
connectDB().then(() => {
    app.on("Error", (error) => {
        console.log("Error while serving application ", error)
        throw error
    })

    app.listen(process.env.PORT || 8000 , () => {
        console.log(`⚙️ the server is serving at ${process.env.PORT || 8000}`)
    })
}).catch((error) => {
    console.log("Connecting to DB ? ERROR", error)
})
/*
const app = express()

;(async () => {
    try{
        await mongoose.connect(`${process.env.MONGO_DB_PORT}/${DB_NAME}`)
        app.on("error", (error) => {
            console.log("ERRR", error);
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`the port serving on ${process.env.PORT}`)
        })
    }catch(e){
        console.error("error"+  e)
        throw e
    }
})()
*/