const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
dotenv.config();

const server = express();


// middlewares
server.use(cors());
server.use(express.json());
server.use(logger('dev'));
server.use(helmet());


// connect to mongodb
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log(`MongoDB connection established successfully!`);
})

server.get('/', (req, res) => {
    res.json(`Welcome to relationships-in-mongodb`);
})

// routes
const usersRouter = require('./routes/users');
const identifiersRouter = require('./routes/identifiers');
server.use('/users', usersRouter);
server.use('/identifiers', identifiersRouter);



const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`server is running on port ${port}`);
})