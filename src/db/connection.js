const mongoose = require("mongoose")

async function connection() {
    try {
        await mongoose.connect(process.env.mongo_uri)
        console.log("Connection Established to MongoDB")
    } catch (error) {
        console.log(error)
    }
}

connection();