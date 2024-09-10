ARG FUSEKI_VERSION=5.1.0
ARG FUSEKI_FILE=jena-fuseki-server-${FUSEKI_VERSION}.jar
ARG FUSEKI_SHA1=37975eb485d5506f8606cb7bda8a6e3c8a456a78

FROM eclipse-temurin:21-jdk-alpine AS builder

RUN apk add --no-cache wget=1.24.5-r0 unzip=6.0-r14

ENV JENA_VERSION=5.1.0
ENV JENA_NAME=apache-jena-${JENA_VERSION}
ENV JENA_FILE=${JENA_NAME}.zip
ENV JENA_SHA1=8dd5e5c3bff06fa04b5d88c80f6550f1dfd52575

ARG FUSEKI_VERSION
ARG FUSEKI_FILE
ARG FUSEKI_SHA1

ENV FUSEKI_VERSION=${FUSEKI_VERSION}
ENV FUSEKI_FILE=${FUSEKI_FILE}
ENV FUSEKI_SHA1=${FUSEKI_SHA1}

SHELL ["/bin/ash", "-eo", "pipefail", "-c"]

WORKDIR /app

RUN wget --progress=dot:giga "https://repo1.maven.org/maven2/org/apache/jena/apache-jena/${JENA_VERSION}/${JENA_FILE}" && \
    echo "${JENA_SHA1}  ${JENA_FILE}" | sha1sum -c - && \
    wget --progress=dot:giga "https://repo1.maven.org/maven2/org/apache/jena/jena-fuseki-server/${FUSEKI_VERSION}/${FUSEKI_FILE}" && \
    echo "${FUSEKI_SHA1}  ${FUSEKI_FILE}" | sha1sum -c - && \
    unzip "${JENA_FILE}" && \
    rm "${JENA_FILE}"

ENV PATH="/app/${JENA_NAME}/bin:$PATH"

COPY datasets datasets

RUN for ttlfile in datasets/*.ttl; do \
      dbname=$(basename "$ttlfile" .ttl); \
      tdb2.tdbloader --loc databases/"$dbname" "$ttlfile"; \
    done

FROM node:20.17.0-alpine3.20 AS config-builder

WORKDIR /fuseki

COPY datasets datasets

COPY create-config.js create-config.js

RUN node create-config.js

FROM eclipse-temurin:21-jdk-alpine

ARG FUSEKI_FILE
ENV FUSEKI_FILE=${FUSEKI_FILE}

WORKDIR /fuseki

COPY --from=config-builder /fuseki/config.ttl config.ttl
COPY --from=builder /app/databases /fuseki/databases
COPY --from=builder /app/${FUSEKI_FILE} /fuseki/${FUSEKI_FILE}

COPY config.ttl config.ttl

EXPOSE 3030

CMD ["sh", "-c", "java -jar ${FUSEKI_FILE} --config=config.ttl"]
