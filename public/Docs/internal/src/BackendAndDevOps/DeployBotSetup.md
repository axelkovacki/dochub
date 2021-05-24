# Setup DeployBot Server

create new ec2 with Ubuntu
download github project with SSH

## Setup server vars

#### Change ~/.ssh/environment script:

```sh
sudo vim ~/.ssh/environment
export CLIPP_PATH=${path}
export DOCKERHUB_PRODUCTION_PASSWORD=${password}
export DOCKERHUB_HOMOLOG_PASSWORD=${password}

```

#### Change ~/.bashrc line script to source env var for ssh:

```sh
sudo vim ~/.bashrc
# If not running interactively, don't do anything
case $- in
    *i*) ;;
      *) . ~/.ssh/environment;;
esac

```

#### Change sshd_config to get permissions for ssh env vars:
obs: change `PermitUserEnvironment` to yes

```sh
sudo vim /etc/ssh/sshd_config
PermitUserEnvironment yes
```

## Setup project to deploy

#### Install docker, php extensions and composer:

```sh
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt-get update
sudo apt-get install -y docker-ce

sudo apt install apt-transport-https lsb-release ca-certificates
sudo wget -O /etc/apt/trusted.gpg.d/php.gpg https://packages.sury.org/php/apt.gpg
echo "deb https://packages.sury.org/php/ $(lsb_release -sc) main" | sudo tee /etc/apt/sources.list.d/php.list
sudo apt install php7.2-dev -y
sudo apt install libcurl4-openssl-dev pkg-config libssl-dev -y
sudo apt install php7.2-curl php7.2-gd php7.2-intl php7.2-sqlite3 php7.2-soap php7.2-bcmath php7.2-memcached php7.2-mbstring php7.2-zip php7.2-gettext php7.2-xml
sudo pecl install mongodb

vim /etc/php/7.2/cli/php.ini
> add extension=mongodb.so

curl -sS https://getcomposer.org/installer | sudo php -- --install-dir=/usr/local/bin --filename=composer
```

#### Install frontend dependencies:
```sh
sudo apt-get install nodejs-dev node-gyp libssl1.0-dev npm yarn
cd ${path}/Frontend
make dev
```

#### Add the user to docker and then reboot:
```sh
sudo usermod -aG docker ${USER}
sudo reboot
```

#### Install final configs for project project
```sh
cd compufacil
git reset --hard origin/master
source Cli/devops/cpf-variables
cpf-mirror-remote-database.sh --homolog
sudo chmod 400 DevOps/aws/clippAWS.pem
sudo touch ~/.composer
sudo chown -R ubuntu:ubuntu ~/.composer
cd Backend && composer install
sudo service apache2 stop
sudo apt-get purge apache2
sudo apt-get autoremove
sudo rm -rf /etc/apache2
```
#### Run first deploy manually on your machine

```sh
ssh -t -i DevOps/aws/clippAWS.pem ubuntu@18.231.125.247 -t "source \$CLIPP_PATH/Cli/devops/cpf-variables && \$CLIPP_PATH/Cli/devops/cpf-automatic-deploy.sh $commit"
```
