const mongoose = require('mongoose')
require('dotenv').config()
mongoose.set('strictQuery', false);
const connection = mongoose.connect(process.env.mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB', err);
});
module.exports={
    connection
}