FROM node:12

ARG FRONT_PORT=8080
ENV FRONT_PORT=${FRONT_PORT}
ENV WORKDIR /usr/src/github-explorer

RUN mkdir ${WORKDIR}

WORKDIR ${WORKDIR}

ADD build ${WORKDIR}

RUN npm i -g serve

CMD serve -l ${FRONT_PORT} -s