const mongoose = require('mongoose');


async function connectDb() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // Increase timeout to 5 seconds
        });
        console.log("Mongo connected successfully");
    } catch (err) {
        console.log("Error occurred", err);
    }
}

module.exports = {
    connectDb,
}
