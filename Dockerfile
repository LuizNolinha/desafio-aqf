# Dockerfile
FROM node:18

# Cria diretório de app
WORKDIR /usr/src/app

# Copia os arquivos e instala dependências
COPY package*.json ./
RUN npm install

# Copia o restante do projeto
COPY . .

# Compila o TypeScript
RUN npm run build

# Expõe a porta (ajuste se necessário)
EXPOSE 3000

# Comando para iniciar
CMD ["npm", "run", "dev"]
