const mongoose = require('mongoose');
const config = require('./config');

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoUri);
    console.log("Connection with MongoDB Established!");
  } catch (error) {
    console.error('Erro ao conectar com o MongoDB:', error.message);
    process.exit(1);
  }
}

module.exports = connectDB;