import { DataSource } from 'typeorm';
import { User } from '../entity/user.entity';
import { Product } from '../entity/product.entity';
import 'dotenv/config'; 


export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: true,
  logging: false,
  entities: [User, Product],
});
