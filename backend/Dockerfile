FROM node:24-alpine
WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./
RUN npm ci
COPY . .
EXPOSE 3001
CMD ["ts-node", "index.ts"]