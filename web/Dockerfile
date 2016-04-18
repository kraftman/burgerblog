FROM erikcw/lapis:latest

RUN apt-get update
RUN apt-get install -y autossh uuid-dev dnsmasq luajit libmagickwand-dev luarocks
RUN luarocks install magick

RUN echo "\n\n# Docker extra config \nuser=root\naddn-hosts=/etc/hosts\n" >> /etc/dnsmasq.conf
