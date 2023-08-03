const express= require('express'); 
const cors = require('cors');
const mongoose = require('mongoose'); //help to connect w mongodb 

require('dotenv').config(); //cso that we can have our env variables in dotenv file.

const app = express(); //creating express server
const port=process.env.PORT || 5000; //port no on which server will be

app.use(cors()); //cors middleware 
app.use(express.json()); //will help us to parse json because our server is going to be sendinf and receiving json

const uri=process.env.ATLAS_URI;
//mongoose.connect(uri,{useNewUrlParser: true, useCreateIndex: true}
mongoose.connect(uri, {useNewUrlParser: true, 

    useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open',()=>{
    console.log("MongoDB Database connection established successfully");

})

//telling the server to use the newly created files ex.js nand users.js

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises',exercisesRouter); //now, whenever someone goes to root URL and they put /ex at the end, its gonna load exercRouter
app.use('/users',usersRouter); //"" /users -> usersRouter

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

//app.listen(port,() => {
    //console.log(Server is running on port: ${port});
//}); //starts the server stats listening at a certain server