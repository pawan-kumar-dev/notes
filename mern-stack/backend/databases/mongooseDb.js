const mongoose = require("mongoose");

const secondDBConnection = mongoose.createConnection(
  "mongodb://stage_tekie_app:MshreyaOMENtkunnu@192.168.119.129:27017/tekie"
);

const PORT = process.env.PORT;

const connectDb = (app) => {
    mongoose.connect(process.env.MONGO_URI).then((res) => {
      // Will only listen when we are connected to db
      app.listen(PORT, () => {
        console.log(`Connected to db and listening on port ${PORT}`);
      });
    });
}

module.exports = {
  connectDb, secondDBConnection
};
