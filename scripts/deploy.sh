#!/bin/bash
sudo docker build -t meridos/cats-ui:react .
sudo docker push "meridos/cats-ui:react"
sudo ssh -T "root@bobrovartem.ru" << EOF
    (docker rm -f cats-ui) || true
    docker run -d \
    --name cats-ui \
    --restart always \
    -p 8080:8080 \
    "meridos/cats-ui:react"
EOF
