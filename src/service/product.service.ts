import 'dotenv/config'; 
import { IBasicReturn } from '../request/response/IBasicReturn';
import { fakeStore } from '../integration/fakeStore.integration';
import { AppDataSource } from '../infra/datasource';
import { Product } from '../entity/product.entity';
import { productToResponse } from '../request/dto/productResponse.dto';
import { getUserOrNotFound } from '../utils/getUserById';

const productRepository = AppDataSource.getRepository(Product);

export const productService = {
    getAll: async (): Promise<IBasicReturn> => {

        try{
            const products = await fakeStore.getAllProducts();

            return {
                status: 200,
                response: products
            };
        }catch(ex){
            return {
                status: 500,
                response: {
                    'error': `Erro ao buscar produtos ${ex}`
                }
            };
        }
    },
    addProduct: async (id: number, productId: number): Promise<IBasicReturn> => {
        try{
            
            const result = await getUserOrNotFound(id);
            if ('status' in result) return result;
            const { user } = result;
            
            const product = await fakeStore.getProductById(productId);
            if(!product){
                 return { status: 404, response: { error: 'Esse produto não existe' } };
            }

            const alreadySaved = await productRepository.findOneBy({ externalId: productId, user });

            if(alreadySaved){
                return { status: 200, response: { message: 'Produto ja salvo!' } };
            }

            await productRepository.save({
                externalId: productId,
                imgSrc: product.image,
                price: product.price,
                review: product.rating?.rate || null,
                title: product.title, 
                user
            });

            return {
                status: 200,
                response: {
                    message: 'Salvo com sucesso!'
                }
            };
        }catch(ex){
            return {
                status: 500,
                response: {
                    'error': `Erro ao adicionar produto ao cliente ${ex}`
                }
            };
        }
    },
    getProductsByUser: async (id: number): Promise<IBasicReturn> => {
        const result = await getUserOrNotFound(id);
        if ('status' in result) return result;
        const { user } = result;
        
        const products = await productRepository.findBy({user});

        return {
            status: 200,
            response: {products: products.map((p) => productToResponse(p))}
        };
    }

};