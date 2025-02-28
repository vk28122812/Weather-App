# Use the official Node.js 20 image as a base
FROM node:20

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the server application code
COPY . .

# Expose the port your server is running on (e.g., 3000)
EXPOSE 3000

# Command to run the Node.js server
CMD ["node", "app.js"]
