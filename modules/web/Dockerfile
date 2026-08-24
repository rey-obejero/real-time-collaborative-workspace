FROM node:22-alpine AS build
WORKDIR /repo
RUN corepack enable
ARG VITE_API_URL=/api/v1
ENV VITE_API_URL=$VITE_API_URL
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY modules/web/package.json modules/web/
RUN pnpm install --frozen-lockfile
COPY modules/web modules/web
RUN pnpm --filter knowledge-management-app-web build

FROM caddy:2-alpine
COPY infrastructure/Caddyfile.prod /etc/caddy/Caddyfile.prod
COPY infrastructure/Caddyfile.e2e /etc/caddy/Caddyfile.e2e
COPY --from=build /repo/modules/web/dist /srv
EXPOSE 80 443
CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile.prod", "--adapter", "caddyfile"]
