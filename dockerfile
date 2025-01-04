# Use an official Node.js runtime as a builder
FROM node:18 as builder

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the Angular application
RUN npm run build -- --configuration production

# Use a lightweight web server for production
FROM nginx:stable-alpine

# Copy the build output to the Nginx HTML directory
COPY --from=builder dist/stock-bizz /usr/share/nginx/html

# Expose the port Nginx runs on
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
