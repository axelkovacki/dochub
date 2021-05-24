all: serve

build:
	mkdocs build
serve:
	trap "pkill mkdocs" SIGHUP SIGINT SIGTERM
	sleep 4 && ${BROWSER} http://localhost:8089 &
	mkdocs serve --dev-addr=0.0.0.0:8089
deploy: build
	aws s3 cp --acl=public-read --recursive site/ s3://developer.clippfacil.com.br/

