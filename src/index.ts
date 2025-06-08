import express from 'express';
import routes from './routes/index.routes';
import { AppDataSource } from './infra/datasource';

import 'reflect-metadata';
import 'dotenv/config'; 

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('API rodando!');
});

app.use(routes);

AppDataSource.initialize().then(() => {
    console.log('📦 Banco de dados conectado!');

    app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });

}).catch((err) => {
    console.error('Erro ao conectar ao banco:', err);
});
    
