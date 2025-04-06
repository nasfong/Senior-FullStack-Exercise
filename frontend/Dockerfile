# Dockerfile

FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the source
COPY . .

# Expose Vite dev server port
EXPOSE 5173

# Run Vite in dev mode
CMD ["npm", "run", "dev"]
