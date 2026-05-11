require('dotenv').config();
const config = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET,
  mongoUri: process.env.MONGODB_URI
}

module.exports = config;