import { Request, Response } from 'express';
import { productService } from '../service/product.service';
import { User } from '../entity/user.entity';

export const productController = {
    getAll: async (req: Request, res: Response) => {
        const result = await productService.getAll();
        return res.status(result.status).json(result.response);
    },
    addProduct: async (req: Request, res: Response) => {
        const user = (req as any).user as User;
        const result = await productService.addProduct(user.id as number, req.body.productId);
        return res.status(result.status).json(result.response);
    },
    getProductsByUser: async (req: Request, res: Response) => {
        const user = (req as any).user as User;
        const result = await productService.getProductsByUser(user.id as number);
        return res.status(result.status).json(result.response);
    }
};