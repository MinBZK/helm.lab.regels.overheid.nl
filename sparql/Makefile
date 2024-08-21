build-push-server:
	cd server && \
	docker buildx build --push --platform linux/amd64 -t registry.digitalocean.com/regels-overheid-nl/sparql-server:latest .
build-push-ui:
	cd ui && \
	docker buildx build --push --platform linux/amd64 --build-arg basePath=/lab/sparql/ui/ -t registry.digitalocean.com/regels-overheid-nl/sparql-ui:latest .
