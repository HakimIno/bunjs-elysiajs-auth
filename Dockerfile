FROM oven/bun:1.0.7

WORKDIR /app

COPY . .

RUN bun install

ENV NODE_ENV production

ARG PORT
EXPOSE ${PORT:-8080}

CMD [ "bun", "run", "dev" ]
