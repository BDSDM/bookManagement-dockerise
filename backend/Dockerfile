# --- Étape 1 : Build du projet ---
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

# Copier le pom.xml et télécharger les dépendances
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copier le code source et construire l'application
COPY src ./src
RUN mvn clean package -DskipTests

# --- Étape 2 : Image finale ---
FROM eclipse-temurin:17-jdk
WORKDIR /app

# Récupération du Jar compilé
ARG JAR_FILE=/app/target/*.jar
COPY --from=build ${JAR_FILE} app.jar

# Exposer le port Spring Boot
EXPOSE 8080

# Lancement du backend
ENTRYPOINT ["java", "-jar", "app.jar"]
