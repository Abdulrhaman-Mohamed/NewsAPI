FROM node:alpine 

# Set working directory
WORKDIR /backend

# Copy your application code
COPY package*.json .

RUN npm install

# Copy your source code
COPY . .


# Set the command to execute your application (replace with your actual entry point)
CMD [ "npm", "run" , "dev" ]