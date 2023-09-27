const express = require('express');

const path = require('path');

const app = express();

const PORT = process.env.PORT || 8000;

const db = require('./config/mongoose');

app.use('/' , require('./routes'));


app.set('view engine' , 'ejs');

app.set('views' , './views');

app.listen(PORT , function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${PORT}`);
});