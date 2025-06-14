FROM node:20-alpine AS builder

# 1. Set Vite environment variables for different backend services
ARG VITE_AUTH_URL
ENV VITE_AUTH_URL=${VITE_AUTH_URL}

ARG VITE_HOUSING_URL
ENV VITE_HOUSING_URL=${VITE_HOUSING_URL}

ARG VITE_PROFILE_URL
ENV VITE_PROFILE_URL=${VITE_PROFILE_URL}

ARG VITE_BUCKET_UPLOAD_URL
ENV VITE_BUCKET_UPLOAD_URL=${VITE_BUCKET_UPLOAD_URL}

ARG VITE_WEALTH_MANAGEMENT_URL
ENV VITE_WEALTH_MANAGEMENT_URL=${VITE_WEALTH_MANAGEMENT_URL}

ARG VITE_DASHBOARD_MANAGEMENT_URL
ENV VITE_DASHBOARD_MANAGEMENT_URL=${VITE_DASHBOARD_MANAGEMENT_URL}

ARG VITE_CALENDAR_URL
ENV VITE_CALENDAR_URL=${VITE_CALENDAR_URL}

ARG VITE_API_URL_DOCUMENT_MANAGEMENT
ENV VITE_API_URL_DOCUMENT_MANAGEMENT=${VITE_API_URL_DOCUMENT_MANAGEMENT}

ARG VITE_ADMIN_URL
ENV VITE_ADMIN_URL=${VITE_ADMIN_URL}

ARG VITE_CHAT_URL
ENV VITE_CHAT_URL=${VITE_CHAT_URL}

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
CMD ["npx", "concurrently", "\"npm run start:server\"", "\"npm run start:frontend\""]
