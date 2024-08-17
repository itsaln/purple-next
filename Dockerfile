FROM node:20-alpine
WORKDIR /opt/app
ADD package.json package.json
RUN yarn install
ADD . .
ENV NODE_ENV production
RUN yarn build
CMD ["yarn", "start"]
EXPOSE 3000