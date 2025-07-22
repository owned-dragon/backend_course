
import dotenv from "dotenv";



import connectDB from './db/index.js';



dotenv.config({path: "/.env"})
connectDB()
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