#!/usr/bin/env bash

project=$(jq -r .name package.json)
version=$(jq -r .version package.json)
platform="linux/amd64,linux/arm64"
image="$DOCKER_USERNAME/$project:$version"

docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD

echo "👷   Creating builder $project ..."
docker buildx create --name "$project"
docker buildx use "$project"

echo "🏗    Building $image ..."
docker buildx build --platform "$platform" -t "$image" --push .
docker buildx imagetools inspect "$image"
