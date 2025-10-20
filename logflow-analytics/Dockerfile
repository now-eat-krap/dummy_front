# ---------- Build ----------
FROM node:20-alpine AS builder
WORKDIR /app

ENV CI=1 \
    NEXT_TELEMETRY_DISABLED=1

RUN corepack enable && corepack prepare pnpm@9.15.4 --activate

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --no-frozen-lockfile

COPY . .
RUN pnpm run build

RUN pnpm prune --prod

# ---------- Run ----------
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000

RUN apk add --no-cache curl
RUN corepack enable && corepack prepare pnpm@9.15.4 --activate

COPY --from=builder /app /app

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD curl -fsS http://127.0.0.1:3000/ || exit 1

CMD ["pnpm", "run", "start"]
