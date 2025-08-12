#!/bin/bash
TARGET=${1:-portals-ui}
PROJECT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null & cd ../ && pwd )
BASE_DIR=$(cd ${PROJECT_DIR}/.. && pwd )
DEST_DIR=${BASE_DIR}/${TARGET}/node_modules/@warda/library-ui/
cd ${BASE_DIR}/${TARGET}
rm -rf $DEST_DIR
mkdir -p $DEST_DIR
cd ${BASE_DIR}/library-ui
# nvm use
npm run clean
npm run publish:create
cp -R ${PROJECT_DIR}/package/* $DEST_DIR
