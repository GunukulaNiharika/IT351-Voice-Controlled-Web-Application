const express = require('express');
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const {spawn} = require('child_process')
const connectDB=require('../db');

//Routes
const authRoutes = require('./Routes/auth');
const adminRoutes=require('./Routes/admin/auth');
const addressRoutes = require('./Routes/addressRoutes')
const categoryRoutes=require('./routes/categoryRoutes');
const productRoutes=require('./routes/productRoutes');
const cartRoutes=require('./routes/cartRoutes');
const pageRoutes=require('./Routes/admin/page'); 
const orderRoutes  = require('./Routes/orderRoutes');
const initialDataRoutes=require('./routes/admin/initialData');

const cors=require('cors');
const path = require('path');

const app = express();
// const python = spawn('python', ['script1.py']);
dotenv.config();

connectDB();
app.use(cookieParser());
app.use(cors());
app.use("/public", express.static(path.join(__dirname, "uploads")));
app.use(express.urlencoded({extended:false}));
app.use(express.json());


app.use('/api',authRoutes);
app.use('/api',adminRoutes);
app.use('/api',categoryRoutes);
app.use('/api',productRoutes);
app.use('/api',cartRoutes);
app.use('/api',initialDataRoutes);
app.use('/api', pageRoutes);
app.use('/api', addressRoutes);
app.use('/api', orderRoutes)

// app.get('/py', (req, res) => {
 
//     var dataToSend;
//     // spawn new child process to call the python script
//     const python = spawn('python', ['script1.py']);
//     // collect data from script
//     python.stdout.on('data', function (data) {
//      console.log('Pipe data from python script ...');
//      dataToSend = data.toString();
//     });
//     // in close event we are sure that stream from child process is closed
//     python.on('close', (code) => {
//     console.log(`child process close all stdio with code ${code}`);
//     // send data to browser
//     res.send(dataToSend)
//     });
    
//    })
//    app.listen(process.env.PORT, () => console.log(`Example app listening on port 
//    ${process.env.PORT}!`))

app.use((req,res)=>{
    res.status(404).json({
        msg:'page not found'
    })
})


app.listen(process.env.PORT, () => {
    console.log("Server is running");
})