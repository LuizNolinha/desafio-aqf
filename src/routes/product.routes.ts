import { Router } from 'express';
import { productController } from '../controller/product.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const productRouter = Router();

productRouter.get('/all',  async (req, res) => {
    productController.getAll(req, res);
});
productRouter.get('/favorites', authMiddleware, async (req, res) => {
    productController.getProductsByUser(req, res);
});
productRouter.post('/', authMiddleware, async (req, res) => {
    productController.addProduct(req, res);
});


export default productRouter;