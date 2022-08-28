#! /bin/bash
# $1 is the token of the project of sonar

sonar-scanner \
  -Dsonar.projectKey=TP_TACS_2022_2C_Frontend \
  -Dsonar.sources=. \
  -Dsonar.host.url=http://localhost:9000 \
  -Dsonar.login=$1