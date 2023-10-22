FROM oven/bun:1.0.7

WORKDIR /app

RUN bun install 

COPY . .

ENV NODE_ENV production

ARG PORT
EXPOSE ${PORT:-8080}
 
CMD ["bun", "src/index.ts"]
