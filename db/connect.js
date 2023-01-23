const mongoose = require('mongoose');

//via monogoose we can connect to our cloud data base

const connectDB = (url) => {
  return mongoose
    .set({ strictQuery: true })
    .connect(url)
    .then(() => console.log('CONNECTED TO THE DB...'))
    .catch((err) => console.log(err));
};

module.exports = connectDB;
