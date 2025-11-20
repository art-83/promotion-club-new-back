FROM node:20-slim
WORKDIR /
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npx", "pm2-runtime", "dist/shared/infra/http/server.js"]