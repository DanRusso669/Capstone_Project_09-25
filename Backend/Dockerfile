FROM eclipse-temurin:21.0.8_9-jdk AS builder
COPY ./src /build/src
COPY ./.mvn /build/.mvn
COPY pom.xml /build
COPY mvnw.cmd /build
COPY env.properties /build
COPY mvnw /build

WORKDIR /build

RUN ./mvnw clean package -Pdocker -Dspring.profiles.active=test

FROM eclipse-temurin:21.0.8_9-jre
COPY --from=builder /build/target/capstoneProject-0.0.1-SNAPSHOT.jar app.jar
COPY --from=builder /build/env.properties env.properties
EXPOSE 3001
ENTRYPOINT ["java","-jar","app.jar"]