const mongoose = require('mongoose');
const connect = mongoose.connect("mongodb+srv://sumanmondal9500:B8KHT4aLTCMZ1tsQ@cluster0.ab5pcj6.mongodb.net/ALFRESCO?retryWrites=true&w=majority&appName=Cluster0");


// Check database connected or not
connect.then(() => {
    console.log("Database Connected Successfully");
})
    .catch(() => {
        console.log("Database cannot be Connected");
    })

const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

// Session store
const store = new MongoDBStore({
    uri: "mongodb+srv://sumanmondal9500:B8KHT4aLTCMZ1tsQ@cluster0.ab5pcj6.mongodb.net/ALFRESCO?retryWrites=true&w=majority&appName=Cluster0",
    collection: 'sessions'
});

module.exports = store;