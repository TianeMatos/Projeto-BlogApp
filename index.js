const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const config = require('./src/config/config');
const methodOverride = require('method-override');
const connectDB = require('./src/config/database');

// Connection With DB
connectDB();

const app = express();

// Routes
const allRoutes = require('./src/routes/index');
const identifyUser = require('./src/middleware/identifyUser');

// Configurations
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

// Middlewares
app.use(express.static(path.join(__dirname, './src/public')));
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(identifyUser);

// Routes
app.use('/', allRoutes);

// 404 Error
app.use((req, res, next) => {
  const err = new Error("Página Não Encontrada");
  err.status = 404;
  next(err);
});

// Error Handler
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  
  res.status(statusCode).render('./pages/error', { 
    title: "Erro", 
    message: err.message,
    status: statusCode
  });
});

app.listen(config.port, () => console.log("Server Working"));