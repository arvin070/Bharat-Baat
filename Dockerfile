# Stage 1: Build the application
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Copy package files and install all dependencies (including devDependencies needed for build)
COPY package*.json ./
RUN npm ci

# Copy the rest of the source code and build the project
COPY . .
RUN npm run build

# Stage 2: Run the production application
FROM node:20-alpine

WORKDIR /usr/src/app

# Set environment to production
ENV NODE_ENV=production

# Install only production dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy the compiled client assets and server bundle from the builder stage
COPY --from=builder /usr/src/app/dist ./dist

# Expose the default port (can be overridden by process.env.PORT)
EXPOSE 3000

# Start the Node server
CMD ["npm", "start"]
