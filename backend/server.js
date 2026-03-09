require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./src/routes/authRoutes')
const productRoutes = require('./src/routes/productRoutes')
const cartRoutes = require("./src/routes/cartRoutes")

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/products',productRoutes)
app.use('/api/cart', cartRoutes)


mongoose.connect(process.env.MONGODB_URI)
.then(()=> console.log('MongoDB Connected'))
.catch((err)=> console.log('MongoDB Connection Error:', err))

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
       console.log(`server running on port ${PORT}`)
})