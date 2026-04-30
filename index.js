const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const config = require('./src/config/config');
const methodOverride = require('method-override');

// Get DB
const connectDB = require('./src/config/database');
// Connection With DB
connectDB();

// User Model
// const User = require('./src/model/User');
const userRouter = require('./src/routes/user');
const authRouter = require('./src/routes/authentication');
const postRouter = require('./src/routes/post');
const identifyUser = require('./src/middleware/identifyUser');

const app = express();

app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, './src/public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Parse the Cookie header
// cookieParser populates req.cookies with an object keyed by the cookie names.
app.use(cookieParser());
app.use(methodOverride('_method'));

app.use(identifyUser);

// Get Home Page
app.get('/', (req, res) => {
  try {
    res.status(200).render('./pages/home', { title: "Home" });
  } catch (error) {
    next("Erro ao Renderizar Página Inicial");
  }
});

// Get About Page
app.get('/about', (req, res) => {
  try {
    res.status(200).render('./pages/about', { title: "Sobre" });
  } catch (error) {
    next("Erro ao Renderizar Página Sobre");
  }
});

// Routes Users
app.use('/posts', postRouter);
app.use('/', authRouter)
app.use('/users', userRouter);

app.use((err, req, res, next) => {
  console.error("Erro Detectado:", err.stack);

  const statusCode = err.status || 500;
  
  res.status(statusCode).render('./pages/error', { 
    title: "Erro", 
    message: err.message,
    status: statusCode
  });
});

app.listen(config.port, () => console.log("Server Working"));