all: serve
.PHONY: presentation
serve:
	mkdocs serve --dev-addr=0.0.0.0:8087 &
	sleep 10 && ${BROWSER} http://localhost:8087 &
build:
	mkdocs build
	cp -rf src/assets/ site/assets
clear:
	rm -rf site/*
	rm -rf presentation.pdf
deploy: build
	rsync -a  -e "ssh -i $(CLIPP_PATH)/DevOps/aws/clippAWS.pem" $(CLIPP_PATH)/Docs/site/ ubuntu@$(CPF_HOMOLOG_SERVER):/var/www/html/developer/internals/
install:
	pip install mkdocs
