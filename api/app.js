const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const contactsRouter = require('./routes/contacts');

const mong_user = process.env.MONGO_USERNAME;
const mong_pass = process.env.MONGO_PASSWORD;
const url= 'mongodb://mongo:27017/CHAT?retryWrites=false';
mongoose.connect(
      url,
      { useNewUrlParser: true,  useUnifiedTopology: true }
).then(()=>console.log('connection established to user database'))
.catch((err)=>console.log(err.message));

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/contacts',contactsRouter);

module.exports = app;
