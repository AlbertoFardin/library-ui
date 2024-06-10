#!/bin/bash
DEST_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null & cd .. && pwd )/seecommerce2-ui/node_modules/@warda/library-ui/
rm -rf package/
npm run publish:create
rm -rf $DEST_DIR
mkdir -p $DEST_DIR
cp -R package/* $DEST_DIR
