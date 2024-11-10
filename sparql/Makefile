build-push-server:
	cd server && \
	docker buildx build --push --platform linux/amd64 -t regels.azurecr.io/lab/sparql-server:latest .
build-push-ui:
	cd ui && \
	docker buildx build --push --platform linux/amd64 --build-arg basePath=/lab/sparql/ui/ -t regels.azurecr.io/lab/sparql-ui:latest .
