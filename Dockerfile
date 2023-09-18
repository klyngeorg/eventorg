FROM oven/bun:1.0.2 as deps
WORKDIR /app

COPY package.json bun.lockb ./

RUN bun install

FROM oven/bun:1.0.2 as build
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN bun install
RUN bun run build

FROM oven/bun:1.0.2 as runner
WORKDIR /app

COPY --from=build /app/build ./

CMD ["bun", "run", "/app/index.js"]