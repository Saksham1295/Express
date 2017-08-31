const mongoose = require('mongoose');
const connect = mongoose.connect('mongodb://localhost:27017/employee',{
  useMongoClient: true,
  /* other options */
});
console.log("Connected");
module.exports = connect;