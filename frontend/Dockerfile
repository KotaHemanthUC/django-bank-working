# Use an official Node runtime as the parent image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of your app's source code
COPY . .

# Make port 3000 available to the outside from the container
EXPOSE 3000

# Run the app in development mode
CMD ["npm", "start"]
