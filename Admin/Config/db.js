const mongoose = require('mongoose')
require('dotenv').config()
mongoose.set('strictQuery', false);
const connection = mongoose.connect('mongodb+srv://Sammyak555:kaymmass@cluster0.yec5n5g.mongodb.net/taskmanager?retryWrites=true&w=majority', {
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