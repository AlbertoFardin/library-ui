#!/usr/bin/env bash

if [ ${ENV} = "dev" ]
then
    aws s3 sync ./.out s3://$BUCKET_NAME/library-ui/$ENV/storybook-components --exclude *.svg
else
    aws s3 sync ./.out s3://$BUCKET_NAME/library-ui/storybook-components --exclude *.svg
fi


