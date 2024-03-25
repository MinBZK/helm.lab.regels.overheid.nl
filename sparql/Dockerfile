FROM eclipse-temurin:21-alpine

RUN apk add --no-cache curl coreutils

ENV FUSEKI_VERSION 4.7.0
ENV FUSEKI_SHA512 9646343a23c2563357207f559cb7437aa91b52d02b87e70d77b746b609e93ed0ad9dce06e072f864d53422946f24aa8ee60d9c594c1f82e8f2ab226eba56e474

ENV FUSEKI_HOME /jena-fuseki
ENV FUSEKI_BASE /fuseki-data

WORKDIR ${FUSEKI_HOME}

RUN curl --output fuseki.tar.gz https://archive.apache.org/dist/jena/binaries/apache-jena-fuseki-${FUSEKI_VERSION}.tar.gz && \
    echo "${FUSEKI_SHA512}  fuseki.tar.gz" | sha512sum -c - && \
    tar zxf fuseki.tar.gz -C ${FUSEKI_HOME} --strip-components=1 && \
    rm -f fuseki.tar.gz

EXPOSE 3030

CMD [ "/jena-fuseki/fuseki-server", "--update"]
