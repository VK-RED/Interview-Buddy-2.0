FROM node:18-alpine as base

FROM base as development
WORKDIR /usr/src/app

# COPY THE PACKAGE.JSON'S FIRST
COPY package.json ./
COPY package-lock.json ./
COPY apps/next-app/package.json ./apps/next-app/package.json

RUN npm install

# Copy source app
COPY . .

# Generate prisma client
RUN npx prisma generate --schema=packages/db/prisma/schema.prisma

EXPOSE 3000
 
CMD ["npm","run","dx"]

#### THE BELOW IMAGES ARE USED FOR PROD

FROM base AS builder
RUN apk add --no-cache libc6-compat
RUN apk update
# Set working directory
WORKDIR /usr/src/app
RUN npm install -g turbo
COPY . .
RUN turbo prune next-app --docker
 
# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /usr/src/app
 
# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /usr/src/app/out/json/ .
COPY --from=builder /usr/src/app/out/package-lock.json ./package-lock.json
RUN npm install
 
# Build the project
COPY --from=builder /usr/src/app/out/full/ .
RUN npx prisma generate --schema=packages/db/prisma/schema.prisma
RUN npm run build:next-app
 
FROM base AS runner
WORKDIR /usr/src/app
 
# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs
 
COPY --from=installer /usr/src/app/apps/next-app/next.config.js .
COPY --from=installer /usr/src/app/apps/next-app/package.json .
 
# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /usr/src/app/apps/next-app/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /usr/src/app/apps/next-app/.next/static ./apps/next-app/.next/static
COPY --from=installer --chown=nextjs:nodejs /usr/src/app/apps/next-app/public ./apps/next-app/public
 
CMD node apps/next-app/server.js