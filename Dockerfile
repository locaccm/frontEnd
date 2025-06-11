FROM node:20-alpine AS builder

# 1. Build environment variable
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

# 2. Set working directory
WORKDIR /app

# 3. Optional: install git (only if needed by deps)
RUN apk add --no-cache git

# 4. Copy dependency files
COPY package*.json ./

# 5. Install dependencies
RUN npm install

# 6. Copy source code
COPY . .

# 7. Build Prisma client
RUN npx prisma generate

# 8. Build everything (includes `tsc -b` for backend + `vite build` for frontend)
RUN npm run build

# 9. Expose backend port
EXPOSE 3000

# 10. Run backend server
CMD ["npm", "run", "start:server"]
