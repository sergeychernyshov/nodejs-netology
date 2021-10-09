docker run -it --name app_lib -p 80:3000 -e PORT=3000 -v%cd%:/app -w /app node /bin/bash

docker run -p 80:3000 --name books book_lib

docker build -t book_lib .

docker rmi book_lib 

docker images

docker ps -a

docker container rm cb
