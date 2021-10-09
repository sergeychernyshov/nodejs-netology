FROM node:latest
WORKDIR /app
COPY ../ /app
EXPOSE 3000/tcp
ENV PORT=3000
RUN npm install
CMD ["cd","/app"]
CMD ["npm","start"]