const express = require('express');
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const connectDB=require('../db');

//Routes
const authRoutes = require('./Routes/auth');
const adminRoutes=require('./Routes/admin/auth');
const categoryRoutes=require('./routes/categoryRoutes');
const productRoutes=require('./routes/productRoutes');
const cartRoutes=require('./routes/cartRoutes');
const pageRoutes=require('./Routes/admin/page'); 
const initialDataRoutes=require('./routes/admin/initialData');

const cors=require('cors');
const path = require('path');

const app = express();

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

app.use((req,res)=>{
    res.status(404).json({
        msg:'page not found'
    })
})


app.listen(process.env.PORT, () => {
    console.log("Server is running");
})