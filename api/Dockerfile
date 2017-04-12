FROM erikcw/lapis:latest

RUN apt-get update && apt-get install -y autossh uuid-dev luajit libmagickwand-dev luarocks
RUN apt-get install openssl
RUN luarocks install --only-server=http://rocks.moonscript.org luasec OPENSSL_LIBDIR=/usr/lib/x86_64-linux-gnu/
RUN luarocks install magick
