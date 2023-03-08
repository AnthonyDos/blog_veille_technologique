const express = require('express');
const helmet = require('helmet')
const mongoSanitize = require("express-mongo-sanitize");
const bodyParse = require('body-parser'); 
const mongoose = require('mongoose');
const path = require('path')

const authenticationRoute = require('./routes/AuthenticationRoute');
const userRoute = require('./routes/UserRoute');
const articleRoute = require('./routes/ArticleRoute');

require('dotenv').config();

mongoose.connect(process.env.DB_NAME,
{  useNewUrlParser: true,
    useUnifiedTopology: true 
})
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !')); 

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); 
    next();
});

app.use(mongoSanitize());
app.use(helmet())

app.use(bodyParse.json());

app.use('/images', express.static(path.join(__dirname,'images')));
app.use('/api/', authenticationRoute);
app.use('/api/auth/user', userRoute);
app.use('/api/article', articleRoute);


module.exports = app;