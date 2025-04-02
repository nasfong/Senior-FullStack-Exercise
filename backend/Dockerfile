# Use a smaller Node.js runtime (Alpine-based)
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies and include optional ones (e.g., sharp)
RUN npm install --include=optional && \
    npm install --os=linux --cpu=x64 sharp --build-from-source && \
    npm cache clean --force

# Copy only necessary application files (public and src)
COPY public ./public
COPY src ./src

# Expose the port your app is running on
EXPOSE 5000

# Command to run your app
CMD ["npm", "run", "dev"]
