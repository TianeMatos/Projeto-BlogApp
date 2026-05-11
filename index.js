const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const config = require('./src/config/config');
const methodOverride = require('method-override');

// Get DB
const connectDB = require('./src/config/database');
// Connection With DB
connectDB();

// Routes
const userRouter = require('./src/routes/user');
const authRouter = require('./src/routes/authentication');
const postRouter = require('./src/routes/post');
const identifyUser = require('./src/middleware/identifyUser');
// Model
const Post = require('./src/model/Post');

const app = express();

app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, './src/public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride('_method'));
// Use Middleware
app.use(identifyUser);

// Get Home Page
app.get('/', async (req, res, next) => {
  try {
    const popularPosts = await Post.find({}).sort({ commentsCount: -1 }).limit(4).populate("author", "name").lean();
    res.status(200).render('./pages/home', { title: "Home", posts: popularPosts });
  } catch (error) {
    const err = new Error("Erro ao Renderizar Página Inícial");
    err.status = 422; 
    next(err);
  }
});

// Get About Page
app.get('/about', (req, res, next) => {
  try {
    res.status(200).render('./pages/about', { title: "Sobre" });
  } catch (error) {
    const err = new Error("Erro ao Renderizar Página Sobre");
    err.status = 422; 
    next(err);
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