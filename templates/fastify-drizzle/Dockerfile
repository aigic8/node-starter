FROM node:22-alpine

WORKDIR /app
RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod

COPY . .

EXPOSE 3000
CMD ["pnpm", "start:prod"]
