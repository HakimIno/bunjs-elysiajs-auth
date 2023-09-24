FROM oven/bun

WORKDIR /usr/src/app

COPY package*.json ./

RUN bun install

COPY . .

EXPOSE 8080

USER bun

CMD bun run --watch src/index.ts

# FROM oven/bun

# WORKDIR /app

# COPY package.json .
# COPY bun.lockb .

# RUN bun install --production

# COPY src src
# COPY tsconfig.json .
# # COPY public public

# ENV NODE_ENV production

# CMD ["bun", "src/index.ts"]

# EXPOSE 3000