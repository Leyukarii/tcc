# Use uma imagem oficial do Node.js como base
FROM node:18-alpine

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie todo o projeto para o diretório de trabalho
COPY . .

# Construa o projeto React
RUN npm run build

# Instale uma ferramenta de servidor para servir os arquivos estáticos
RUN npm install -g serve

# Defina a porta que o contêiner vai expor
EXPOSE 3000

# Comando para rodar o servidor com a build
CMD ["serve", "-s", "dist", "-l", "3000", "--single"]

