# Use the official Node.js 14 image as a base
FROM node:20

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm cache clean --force
RUN npm install

# Copy the rest of the client application code
COPY . .

# Expose port 4200 to the outside world
EXPOSE 4200

# Command to run the Angular application
CMD ["npm", "start","--","--host", "0.0.0.0", "--port", "4200"]
