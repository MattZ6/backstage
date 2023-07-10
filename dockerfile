FROM node:18.12.0-alpine

# Set non-root user and expose port
USER node
EXPOSE ${PORT}

WORKDIR /home/node/app

COPY --chown=node:node package.json pnpm.lock ./

# Install dependencies
RUN pnpm install --frozen-lockfile

COPY --chown=node:node . .

RUN pnpm prisma generate

CMD [ "pnpm", "docker:dev" ]
