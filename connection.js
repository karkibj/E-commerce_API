const mongoose = require('mongoose');


async function connectDb() {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGO_LOCAL_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // Increase timeout to 5 seconds
        });
        console.log("Mongo connected successfully");
        // console.log("hello",connectionInstance.connection.host);
    } catch (err) {
        console.log("Error occurred", err);
    }
}

module.exports = {
    connectDb,
}
