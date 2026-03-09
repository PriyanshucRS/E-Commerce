const Product = require('../models/Product')


exports.addProduct = async(req,res) =>{
    try {
        const newProduct = new Product(req.body)
       const saveProduct = await newProduct.save()
         res.status(201).json(saveProduct)
    } catch (error) {
         res.status(500).json({message: error.message})
    }
}

exports.getProducts = async(req,res)=>{
    try{
        const  products = await Product.find()
        res.json(products)
    }catch(err){
        res.status(500).json({meassage: error.meassage})
    }
}