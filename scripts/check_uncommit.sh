#!/usr/bin/env bash

STATUS=`git status`
if [ "$STATUS" != "" ]; then
    echo "Before publish, you need to commit"
    exit 1
fi
