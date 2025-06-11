FROM node:20-alpine AS builder

# 1. Set environment variable for the database URL
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

# 2. Set working directory inside the container
WORKDIR /app

# 3. Install git (needed if any dependencies require it)
RUN apk add --no-cache git

# 4. Copy package.json and package-lock.json (if present) to install dependencies
COPY package*.json ./

# 5. Install all dependencies
RUN npm install

# 6. Copy all source files into the container
COPY . .

# 7. Build the project (runs both backend TypeScript build and frontend Vite build)
RUN npm run build

# 8. Expose backend port
EXPOSE 4000

# 9. Expose frontend Vite development server port
EXPOSE 5173

# 10. Install concurrently to run multiple commands in parallel
RUN npm install --save-dev concurrently

# 11. Run backend server and frontend development server concurrently
CMD ["npx", "concurrently", "\"npm run start:server\"", "\"npm run start\""]
