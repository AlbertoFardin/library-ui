#!/usr/bin/env bash
STATUS=`hg status`

if [ "$STATUS" != "" ]; then
    echo "Before publish, you need to commit"
    exit 1
fi
