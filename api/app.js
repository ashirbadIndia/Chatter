const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

//const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const contactsRouter = require('./routes/contacts');


const url='mongodb+srv://rw_access:iiMLi3aTDLs4Bh9X@chatter-380nn.gcp.mongodb.net/CHAD?retryWrites=true&w=majority';

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
app.use(express.static(path.join(__dirname, 'client')));

//app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/contacts',contactsRouter);

app.get('/*', (req, res) => {
      res.sendFile(path.join(__dirname, 'client', 'index.html'));
    });

module.exports = app;
