const express = require('express');
const app        = express();
const route      = require('./api/routes/routes');
const faculty    = require('./api/routes/faculty');
const mongoose   = require('mongoose');
const bodyParser = require('body-parser');


mongoose.connect('mongodb+srv://Ankit2101:Ankit2000@cluster0.vswyd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')

mongoose.connection.on('error',err=>{
  console.log('connection failed'); 
})

mongoose.connection.on('connected',connected=>{
  console.log('connected with database....');
})

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.use('/student',route)
app.use('/faculty',faculty)

app.use((req,res,next)=>{
  res.status(404).json({
    error:'bad request'
  })
})

// app.use((req,res,next)=>{
//   res.status(200).json({
//       message:'app is running'
//   })
// })

module.exports = app;