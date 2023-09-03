FROM node:20-alpine3.16 as base

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

RUN corepack enable
WORKDIR /app

FROM base as deps

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

FROM deps as builder

COPY . .

RUN pnpm run build

FROM base as runner

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 service-user
USER service-user

ENV NODE_ENV production

COPY --from=builder /app .

CMD ["node", "build/index.js"]