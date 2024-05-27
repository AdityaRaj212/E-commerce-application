import express from 'express';
import ProductController from './product.controller.js';
import { upload } from '../../middlewares/fileupload.middleware.js';

const router = express.Router();

const productController = new ProductController();

// localhost::3200/api/product
router.get('/',(req,res)=>{
    productController.getAllProducts(req,res);
});
router.post('/',upload.single('imageURL'),(req,res)=>{
    productController.addProduct(req,res);
});
router.get('/filter',(req,res)=>{
    productController.filterProduct(req,res);
});
router.post('/rate',(req,res)=>{
    productController.rateProduct(req,res);
});
router.get('/averagePrice',(req,res)=>{
    productController.averagePrice(req,res);
});
router.get('/highest-no-of-reviews',(req,res)=>{
    productController.highestNoOfRatings(req,res);
})
router.get('/:id',(req,res)=>{
    productController.getOneProduct(req,res);
});

export default router;