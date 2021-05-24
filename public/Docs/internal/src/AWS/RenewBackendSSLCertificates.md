# Renewing AWS Backend SSL Certificates

#### Homolog variables

```sh
SERVICE=homolog_webserver
DOMAIN=app.homolog.clippfacil.com.br | homolog.compufacil.com.br
SERVER_IP=$CPF_HOMOLOG_SERVER
```

#### Production variables
```sh
SERVICE=production_webserver
DOMAIN=api.clippfacil.com.br | app.compufacil.com.br
SERVER_IP=$CPF_PRODUCTION_SERVER
```

## Step 1 (Local/Server) - Generate Certificates

#### (LOCAL) Set the websystem frontend to maintenance
```sh
cd $CLIPP_PATH/Frontend
make deployMaintenance
```

#### (SERVER) Access server via SSH
```sh
cpf-ssh.sh --homolog|--production
sudo su
```

#### Down the webserver docker service to free the ports 443 and 80 due to apache
#### =======================================================
#### WARNING: THE WEBSERVER WILL BE OFF RIGHT AFTER YOU RUN THIS COMMAND. THE COMMAND TO SET IT UP IS RIGHT BELOW
#### =======================================================
```sh
docker service rm $SERVICE
```

#### Wait for about 15 seconds until the ports are free. Command to see the ports listening:
```sh
sudo lsof -i -P -n | grep :443
sudo lsof -i -P -n | grep :80
```

#### Generate the new certificates
```sh
letsencrypt certonly -n --standalone -d '{DOMAIN}' -m admin@clippfacil.com.br --agree-tos
```
P.S.: you may have to set up the locale:
```sh
export LC_ALL="en_US.UTF-8"
export LC_CTYPE="en_US.UTF-8"
```

If letsencrypt is not installed exec:

```sh
sudo apt install letsencrypt
```

#### ========== COMMAND TO SET UP THE SERVER ==========
#### (LOCAL) After the success certificate generation set up the webserver again

```sh
cd $CLIPP_PATH/Backend
make deployProduction
cd $CLIPP_PATH/Frontend
make deployProduction
```

#### Compress keys
```sh
cd /etc/letsencrypt/archive
tar -czvf /tmp/$DOMAIN.tar.gz $DOMAIN/ --absolute-names
sudo chmod 644 /tmp/$DOMAIN.tar.gz
```

## Step 2 (Local) - Import Certificates to Project

#### Access local project and remove old certificates
```sh
rm -rf $CLIPP_PATH/DevOps/certificate/"$DOMAIN"/*.pem
```

#### Download certificates from server
```sh
cpf-get-from-remote.sh --production|--homolog /tmp/$DOMAIN.tar.gz /tmp/
```

#### Extract keys
```sh
cd /tmp
tar -xzvf "$DOMAIN.tar.gz"
cd $DOMAIN
```

#### Rename most recent keys
```sh
mv $(find ./cert*  -printf "%f\n" | sed -e '$!d') new-cert.pem
mv $(find ./chain*  -printf "%f\n" | sed -e '$!d') new-chain.pem
mv $(find ./fullchain*  -printf "%f\n" | sed -e '$!d') new-fullchain.pem
mv $(find ./privkey*  -printf "%f\n" | sed -e '$!d') new-privkey.pem
```

#### Move the new keys into folder
```sh
mv ./new-* $CLIPP_PATH/DevOps/certificate/"$DOMAIN"
```

#### Rename removing the "new" prefix
```sh
cd $CLIPP_PATH/DevOps/certificate/"$DOMAIN"
mv new-cert.pem cert.pem && mv new-chain.pem chain.pem && mv new-fullchain.pem fullchain.pem && mv new-privkey.pem privkey.pem
```

## Step 3 (Local) - Commit and deploy Certificates

#### Remove branch if exists
```sh
git branch -D update-ssl-keys
```

#### Create SSL keys commit
```sh
git checkout -b update-ssl-keys
git add $CLIPP_PATH/DevOps/certificate/
git commit -m "Update SSL certificate keys Y-m-d"
```

#### Deploy to server
```sh
cd $CLIPP_PATH/Backend
make buildAndDeployHomolog|make buildAndDeployProduction
```
