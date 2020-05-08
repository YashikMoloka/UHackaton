FROM node:12.7-alpine as buildContainer
WORKDIR /app
COPY ./package.json ./
COPY ./yarn.lock ./
COPY ./ng-uikit-pro-standard-8.10.0.tgz ./
RUN npm install -g yarn
RUN yarn
COPY . .
RUN yarn run build:universal


FROM node:12.7-alpine
WORKDIR /app
# Copy dependency definitions
COPY --from=buildContainer /app/package.json ./
COPY --from=buildContainer /app/server.js ./

# Get all the code needed to run the app
COPY --from=buildContainer /app/dist ./dist
# COPY --from=buildContainer /app/static ./static
COPY --from=buildContainer /app/dist-server ./dist-server

# Expose the port the app runs in
EXPOSE 4000

# Serve the app
CMD ["yarn", "run", "server"]
