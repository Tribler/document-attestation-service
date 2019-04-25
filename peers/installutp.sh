#!/bin/sh

if [ "$EUID" -ne 0 ]
  then echo "Please run as root"
  exit
fi
rm -r ./libutp

pushd .
git clone https://github.com/bittorrent/libutp
cd libutp
make
install libutp.so /usr/lib/
popd
rm -r ./libutp
