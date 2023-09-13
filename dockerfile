FROM oven/bun:1.0.1

WORKDIR /app

COPY package.json package.json
COPY bun.lockb bun.lockb

RUN bun i

COPY . .

ENV NODE_ENV production

EXPOSE ${PORT}

RUN apt-get update -y && apt-get install -y openssl

RUN bun prisma generate

CMD ["bun", "docker:dev"]
