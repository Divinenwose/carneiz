import productModel from "../models/productModel.js";
import fs from 'fs'

const addProduct = async(req,res) => {

    let image_filename = `${req.file.filename}`;

    const product = new productModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename,
        isFeatured: req.body.isFeatured === "true",
    })
    try {
        await product.save();
        res.json({success:true, message:"Product Added"})
    } catch (error){
        console.log(error)
        res.json({success:false, message:"Error"})
    }
}

const listProduct = async (req, res) => {
    try {
        const product = await productModel.find({});
        res.json({ success: true, data: product });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

const removeProduct = async(req,res) =>{
    try{
        const product = await productModel.findById(req.body.id);
        fs.unlink(`uploads/${product.image}`,()=>{})
        
        await productModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Product Removed"})
    } catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

const listFeaturedProducts = async (req, res) => {
    try {
        const featuredProducts = await productModel.find({ isFeatured: true });
        res.json({ success: true, data: featuredProducts });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error" });
    }
};


export {addProduct,listProduct,removeProduct,listFeaturedProducts}