#!/usr/bin/env bash

kubectl apply -f manifests
kubectl get ns,svc,deploy,po -o wide -n=github-explorer
