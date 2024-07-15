# Use the official Node.js image
FROM node:alpine

# Set the working directory
WORKDIR /frontend

# Copy package.json and package-lock.json
COPY package*.json .

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .


# Command to run the application
CMD ["npm", "run", "dev"]