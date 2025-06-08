import { Product } from '../../entity/product.entity';

interface IProductToResponse {
  id: number | undefined,
  image: string,
  price: number,
  review: number | null 
}

export function productToResponse(product: Product): IProductToResponse {
    return {
        id: product.externalId,
        image: product.imgSrc,
        price: product.price,
        review: product.review
    };
}