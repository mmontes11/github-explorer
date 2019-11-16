FROM node:12

ARG PORT=8080
ENV PORT=${PORT}
ENV WORKDIR /usr/src/github-explorer

RUN mkdir ${WORKDIR}

WORKDIR ${WORKDIR}

ADD build ${WORKDIR}

RUN npm i -g serve

CMD serve -l ${PORT} -s