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
const requireAuth = require('./src/middleware/auth');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Parse the Cookie header
// cookieParser populates req.cookies with an object keyed by the cookie names.
app.use(cookieParser());
app.use(methodOverride('_method'));

app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, './src/public')));

// Get Home
app.get('/', (req, res) => {
  try {
    // console.log(req.userId);
    res.status(200).render('./pages/home', { title: "Home", user: req.user });
  } catch (error) {
    console.log("Erro ao Renderizar Página Inicial");
  }
});

// Routes Users
app.use('/posts', postRouter);
app.use('/', authRouter)
app.use('/users', userRouter);

app.use((err, req, res, next) => {
  res.redirect('/');
})

app.listen(config.port, () => console.log("Server Working"));