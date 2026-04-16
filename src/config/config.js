const config = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "Minha_Chave_Secreta_Do_Blog",
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost/projetcBlog'
}

module.exports = config;