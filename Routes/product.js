const express=require('express')
const Product = require('../models/Product')
const router=express.Router()

const multer = require('multer')


//upload files(imgs)
filename ='';
const myStorage=multer.diskStorage({
    destination:"./uploads",
    filename : (req,file,redirect)=>{
        let date=Date.now()
        // mimetype: imge/png
        let f1=date+'.'+file.mimetype.split('/')[1];
        console.log(f1);
        redirect(null,f1);
        filename=f1;
    }
})
const upload=multer({storage:myStorage})

//Creation of Product
router.post('/createProduct', upload.any('image'),async (req, res) => {
    try {
        data = req.body;
        prod = new Product(data);
        prod.image=filename;
        console.log(data);
        savedProduct = await prod.save();
        filename='';

        res.status(200).send(savedProduct)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/getAllAsyncProduct', async (req, res) => {
    try {
        prod = await Product.find()
        res.status(200).send(prod)
    } catch (error) {
        res.status(400).send(error)
    }
})
router.get('/getProductById/:id', async (req, res) => {
    myid = req.params.id
    try {
        prod = await Product.findOne({ _id: myid })
        res.status(200).send(prod)
    } catch (error) {
        res.status(400).send(error)

    }
})
router.put('/updateProduct/:id', async (req, res) => {

    try {
        id = req.params.id
        updatedProd = req.body
        prod = await Product.findByIdAndUpdate({ _id: id}, updatedProd )
        res.status(200).send(prod)
        console.log('Product updated succefully');

    } catch (error) {
        res.status(400).send(error)
    }
})
router.delete('/deleteProductById/:id', async (req, res) => {
    id = req.params.id
    try {
        prod = await Product.findByIdAndDelete({ _id: id })
        res.status(200).send(prod)
    } catch (error) {
        res.status(400).send(error)
    }
})


module.exports =router