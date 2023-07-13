FROM node:20.4.0

ENV DB_PORT=3306
ENV DB_USER_NAME=id20619513_alumnidb
ENV DB_PASSWORD=Alumnai_pwd23
ENV DB_NAME=alumnaidb
ENV DB_HOST=alumnaimysql.mysql.database.azure.com
# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the files to the working directory
COPY . .

# Expose port 3008
EXPOSE 3008

# Run the app
CMD ["npm", "start"]

