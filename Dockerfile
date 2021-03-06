# Use the official image as a parent image
FROM node:current-slim

# Set the working directory
WORKDIR /usr/src/app

# Copy the file from your host to your current location
COPY package.json .

# Run the command inside your image filesystem
RUN npm install

# Add metadata to the image to describe which port the container is listening on at runtime
EXPOSE 3000

# Run the specific command within the conatiner
CMD [ "npm", "start" ]

COPY . .
