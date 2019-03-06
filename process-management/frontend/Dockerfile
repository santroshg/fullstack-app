FROM node:11.3

RUN mkdir /usr/lib/app -p
WORKDIR /usr/lib/app

COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build --production
RUN npm install -g serve

# CMD serve -s build
EXPOSE 5000

CMD ["serve", "-s", "build"]

# FROM node:11.3

# RUN mkdir /usr/lib/app -p
# WORKDIR /usr/lib/app

# COPY package.json .
# COPY package-lock.json .
# RUN npm install --production
# COPY . .

# EXPOSE 5000
# CMD ["npm", "start", "--production"]
 