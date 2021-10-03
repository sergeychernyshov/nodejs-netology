Установка docker на Ubuntu
    
    >apt-get update
    > 
    >apt install apt-transport-https ca-certificates curl software-properties-common
    >curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
    >add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"
    >apt update
установка будет из репозитория docker

    >apt-cache policy docker-ce
    5:20.10.8~3-0~ubuntu-focal 500
        500 https://download.docker.com/linux/ubuntu focal/stable amd64 Packages
     5:20.10.7~3-0~ubuntu-focal 500
        500 https://download.docker.com/linux/ubuntu focal/stable amd64 Packages
     5:20.10.6~3-0~ubuntu-focal 500

установка docker
    
    >apt install docker-ce
    >systemctl status docker
    ● docker.service - Docker Application Container Engine
     Loaded: loaded (/lib/systemd/system/docker.service; enabled; vendor preset>
     Active: active (running) since Sat 2021-10-02 23:23:55 MSK; 9min ago

    >docker ps
    CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
    root@oracle-docker:~#
    
    > docker --version
    Docker version 20.10.8, build 3967b7d

#Задание 1 - Docker CLI 

###1

    >docker pull busybox
    Using default tag: latest
    latest: Pulling from library/busybox
    24fb2886d6f6: Pull complete
    Digest: sha256:f7ca5a32c10d51aeda3b4d01c61c6061f497893d7f6628b92f822f7117182a57
    Status: Downloaded newer image for busybox:latest
    docker.io/library/busybox:latest

###2

    docker run -i -t --rm busybox ping -c 7 netology.ru
    PING netology.ru (104.22.49.171): 56 data bytes
    64 bytes from 104.22.49.171: seq=0 ttl=55 time=44.978 ms
    64 bytes from 104.22.49.171: seq=1 ttl=55 time=45.192 ms
    64 bytes from 104.22.49.171: seq=2 ttl=55 time=45.506 ms
    64 bytes from 104.22.49.171: seq=3 ttl=55 time=45.449 ms
    64 bytes from 104.22.49.171: seq=4 ttl=55 time=45.631 ms
    64 bytes from 104.22.49.171: seq=5 ttl=55 time=45.461 ms
    64 bytes from 104.22.49.171: seq=6 ttl=55 time=45.156 ms
    
    --- netology.ru ping statistics ---
    7 packets transmitted, 7 packets received, 0% packet loss
    round-trip min/avg/max = 44.978/45.339/45.631 ms

    >docker run -i -t --name pinger busybox ping -c 7 netology.ru
    PING netology.ru (104.22.48.171): 56 data bytes
    64 bytes from 104.22.48.171: seq=0 ttl=54 time=47.154 ms
    64 bytes from 104.22.48.171: seq=1 ttl=54 time=46.891 ms
    64 bytes from 104.22.48.171: seq=2 ttl=54 time=47.933 ms
    64 bytes from 104.22.48.171: seq=3 ttl=54 time=52.423 ms
    64 bytes from 104.22.48.171: seq=4 ttl=54 time=46.796 ms
    64 bytes from 104.22.48.171: seq=5 ttl=54 time=46.893 ms
    64 bytes from 104.22.48.171: seq=6 ttl=54 time=46.492 ms
    
    --- netology.ru ping statistics ---
    7 packets transmitted, 7 packets received, 0% packet loss
    round-trip min/avg/max = 46.492/47.797/52.423 ms

###3

    >docker ps -a
    CONTAINER ID   IMAGE     COMMAND                  CREATED          STATUS                     PORTS     NAMES
    ba8f15cf4bcb   busybox   "ping -c 7 netology.…"   10 seconds ago   Exited (0) 2 seconds ago             pinger

###4

    >docker logs -t pinger
    2021-10-02T21:00:31.299840625Z PING netology.ru (104.22.48.171): 56 data bytes
    2021-10-02T21:00:31.347093358Z 64 bytes from 104.22.48.171: seq=0 ttl=54 time=47.154 ms
    2021-10-02T21:00:32.347012576Z 64 bytes from 104.22.48.171: seq=1 ttl=54 time=46.891 ms
    2021-10-02T21:00:33.348289343Z 64 bytes from 104.22.48.171: seq=2 ttl=54 time=47.933 ms
    2021-10-02T21:00:34.352994923Z 64 bytes from 104.22.48.171: seq=3 ttl=54 time=52.423 ms
    2021-10-02T21:00:35.347845854Z 64 bytes from 104.22.48.171: seq=4 ttl=54 time=46.796 ms
    2021-10-02T21:00:36.347950960Z 64 bytes from 104.22.48.171: seq=5 ttl=54 time=46.893 ms
    2021-10-02T21:00:37.351663314Z 64 bytes from 104.22.48.171: seq=6 ttl=54 time=46.492 ms
    2021-10-02T21:00:37.351711677Z
    2021-10-02T21:00:37.351782179Z --- netology.ru ping statistics ---
    2021-10-02T21:00:37.351801605Z 7 packets transmitted, 7 packets received, 0% packet loss
    2021-10-02T21:00:37.351811086Z round-trip min/avg/max = 46.492/47.797/52.423 ms

###5

    >docker start pinger
    pinger

###6

    >docker ps -a
    CONTAINER ID   IMAGE     COMMAND                  CREATED         STATUS                      PORTS     NAMES
    ba8f15cf4bcb   busybox   "ping -c 7 netology.…"   8 minutes ago   Exited (0) 43 seconds ago             pinger

###7

    >docker logs -t pinger
    2021-10-02T21:00:31.299840625Z PING netology.ru (104.22.48.171): 56 data bytes
    2021-10-02T21:00:31.347093358Z 64 bytes from 104.22.48.171: seq=0 ttl=54 time=47.154 ms
    2021-10-02T21:00:32.347012576Z 64 bytes from 104.22.48.171: seq=1 ttl=54 time=46.891 ms
    2021-10-02T21:00:33.348289343Z 64 bytes from 104.22.48.171: seq=2 ttl=54 time=47.933 ms
    2021-10-02T21:00:34.352994923Z 64 bytes from 104.22.48.171: seq=3 ttl=54 time=52.423 ms
    2021-10-02T21:00:35.347845854Z 64 bytes from 104.22.48.171: seq=4 ttl=54 time=46.796 ms
    2021-10-02T21:00:36.347950960Z 64 bytes from 104.22.48.171: seq=5 ttl=54 time=46.893 ms
    2021-10-02T21:00:37.351663314Z 64 bytes from 104.22.48.171: seq=6 ttl=54 time=46.492 ms
    2021-10-02T21:00:37.351711677Z
    2021-10-02T21:00:37.351782179Z --- netology.ru ping statistics ---
    2021-10-02T21:00:37.351801605Z 7 packets transmitted, 7 packets received, 0% packet loss
    2021-10-02T21:00:37.351811086Z round-trip min/avg/max = 46.492/47.797/52.423 ms
    2021-10-02T21:08:10.984007863Z PING netology.ru (104.22.49.171): 56 data bytes
    2021-10-02T21:08:11.025064281Z 64 bytes from 104.22.49.171: seq=0 ttl=55 time=41.504 ms
    2021-10-02T21:08:12.025508459Z 64 bytes from 104.22.49.171: seq=1 ttl=55 time=41.444 ms
    2021-10-02T21:08:13.025722801Z 64 bytes from 104.22.49.171: seq=2 ttl=55 time=41.438 ms
    2021-10-02T21:08:14.025707616Z 64 bytes from 104.22.49.171: seq=3 ttl=55 time=41.232 ms
    2021-10-02T21:08:15.026359067Z 64 bytes from 104.22.49.171: seq=4 ttl=55 time=41.660 ms
    2021-10-02T21:08:16.026242252Z 64 bytes from 104.22.49.171: seq=5 ttl=55 time=41.351 ms
    2021-10-02T21:08:17.031737603Z 64 bytes from 104.22.49.171: seq=6 ttl=55 time=41.164 ms
    2021-10-02T21:08:17.031789865Z
    2021-10-02T21:08:17.031920594Z --- netology.ru ping statistics ---
    2021-10-02T21:08:17.031944699Z 7 packets transmitted, 7 packets received, 0% packet loss
    2021-10-02T21:08:17.031955545Z round-trip min/avg/max = 41.164/41.399/41.660 ms
    

###8

    Два раза был запущен 2 раза, 14 пингов выполнено

###9

    >docker container rm pinger
    pinger
 
    >docker ps -a
    CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES

###10

    >docker images
    REPOSITORY   TAG       IMAGE ID       CREATED       SIZE
    busybox      latest    16ea53ea7c65   2 weeks ago   1.24MB

    >docker rmi busybox
    Untagged: busybox:latest
    Untagged: busybox@sha256:f7ca5a32c10d51aeda3b4d01c61c6061f497893d7f6628b92f822f7117182a57
    Deleted: sha256:16ea53ea7c652456803632d67517b78a4f9075a10bfdc4fc6b7b4cbf2bc98497
    Deleted: sha256:cfd97936a58000adc09a9f87adeeb7628a2c71d11c4998e6e7f26935fa0cd713
    
    >docker images
    REPOSITORY   TAG       IMAGE ID   CREATED   SIZE


#Задание 2 - Environment Variables

###1

    >docker pull node:15.14
    15.14: Pulling from library/node
    bfde2ec33fbc: Pull complete
    787f5e2f1047: Pull complete
    7b6173a10eb8: Pull complete
    dc05be471d51: Pull complete
    55fab5cadd3c: Pull complete
    bd821d20ef8c: Pull complete
    6041b69671c6: Pull complete
    989c5d2d2313: Pull complete
    4b57d41e8391: Pull complete
    Digest: sha256:608bba799613b1ebf754034ae008849ba51e88b23271412427b76d60ae0d0627
    Status: Downloaded newer image for node:15.14
    docker.io/library/node:15.14

###2

    >docker run -t -i --env NAME=Sergey --env SURNAME=Chernyshov --name mynode node:15.14

###3
    
    >> console.log(`Привет ${process.env.NAME} ${process.env.SURNAME}!`)
    Привет Sergey Chernyshov!


###4

    >docker stop mynode
    mynode

###5

    >docker rmi node:15.14
    Untagged: node:15.14
    Untagged: node@sha256:608bba799613b1ebf754034ae008849ba51e88b23271412427b76d60ae0d0627
    Deleted: sha256:3d3f41722daf1a77c34d6eade6676bbffa2d6a2a21095de2ab0c427a5c942fc9

#Задание 3 - Volumes

###1

    >docker pull node:15.14
    15.14: Pulling from library/node
    bfde2ec33fbc: Pull complete
    787f5e2f1047: Pull complete
    7b6173a10eb8: Pull complete
    dc05be471d51: Pull complete
    55fab5cadd3c: Pull complete
    bd821d20ef8c: Pull complete
    6041b69671c6: Pull complete
    989c5d2d2313: Pull complete
    4b57d41e8391: Pull complete
    Digest: sha256:608bba799613b1ebf754034ae008849ba51e88b23271412427b76d60ae0d0627
    Status: Downloaded newer image for node:15.14
    docker.io/library/node:15.14

###2

    >cd /tmp/
    >mkdir data
    >docker run -d -v '/data':'/var/first/data' --name first_node  node:15.14 ping netology.ru
    b6d79aa00e554b9ecbcf7a1de282495ecfb803c066a2f6892e166319277a1968

###3

    >docker run -d -v '/data':'/var/second/data' --name second_node  node:15.14 ping netology.ru
    e4320a1fabf26416410ae3be1e4314a4216ee6742bf4f9285dfcb16732dda548

    >docker ps
    CONTAINER ID   IMAGE        COMMAND                  CREATED              STATUS              PORTS     NAMES
    e4320a1fabf2   node:15.14   "docker-entrypoint.s…"   51 seconds ago       Up 50 seconds                 second_node
    b6d79aa00e55   node:15.14   "docker-entrypoint.s…"   About a minute ago   Up About a minute             first_node

###4
    
    >docker exec -d first_node touch /var/first/data1/temp.txt
    
###5

     >touch test2.txt

###6

    docker exec -t second_node ls /var/second/data
    temp.txt  temp2.txt
    
    >cat temp.txt
    >cat temp2.txt

###7

    >docker stop first_node
    first_node
    >docker stop second_node
    second_node

###8

    >docker container rm first_node
    first_node
    >docker container rm second_node
    second_node

###9

    docker rmi node:15.14
    Untagged: node:15.14
    Untagged: node@sha256:608bba799613b1ebf754034ae008849ba51e88b23271412427b76d60ae0d0627
    Deleted: sha256:3d3f41722daf1a77c34d6eade6676bbffa2d6a2a21095de2ab0c427a5c942fc9
    Deleted: sha256:601382991a159cfc5013ad973158f30b7b7a913e8d7e547b3456deab3ad98022
    Deleted: sha256:d5db49eecae8c02c9ea3a79f89c43ded9162bac118a0302a7b514d0df82aa112
    Deleted: sha256:a2c1973858d0aad3de0927294602b17c8ef9050c30e0f461e0868997a08552a4
    Deleted: sha256:a0153172017a08a521a8be971ca4dcb5fbc4b7227642c12bbb2da6265bd66b50
    Deleted: sha256:f1123940e954d335d91b52a40fab4f8144f38ff113ade7d65663071d0f06da6f
    Deleted: sha256:f1f4fbb0e7e6e0ce2d9eae1e577f9f6df0a719dd874bff00b2d08895c75c297d
    Deleted: sha256:1eb455ab6d45fdbbd90fccff791ffa228080c052acf464f8da1b1d78650bd706
    Deleted: sha256:1dbe832a694971a925d7d216f49b700c95f402bd72288f9d37eceb1d59dcf72d
    Deleted: sha256:2f4ee6a2e1b5dfb9236cd262e788f9d39109242ca27a4aacb583c8af66ec3ff7
