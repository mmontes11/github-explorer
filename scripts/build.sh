#!/usr/bin/env bash

npm run build

builder=$(jq -r .name package.json)
version=$(jq -r .version package.json)
platform="linux/amd64,linux/arm64"
image="mmontes11/github-explorer:$version"

echo "🏗️   Building ${image} ..."
docker buildx create --name "$builder"
docker buildx use "$builder"
docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD
docker buildx build --platform "$platform" --build-arg PORT=80 -t "$image" --push .
docker buildx imagetools inspect "$image"
