# Ambiente de Desenvolvimento

O propósito desse manual é realizar o onboarding de novos
desenvolvedores, sendo também que, não é a intenção deste ser
uma referência completa de todas as dependências do compufácil.

A distro Ubuntu foi utilizada como base de referência para a
elaboração deste guia e o processo de instalação abaixo pode
estar sujeito a pequenas mudanças em outras distribuições.

## 1. Clonando o projeto do Github

## HTTP:

```sh
git clone https://github.com/compufour/compufacil.git
```

## SSH:

```sh
git clone git@github.com:compufour/compufacil.git
```

#### Configurando e adicionando chave ssh:

https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/

https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account/

#### Para gerar Github Token ####
https://github.com/settings/tokens

```sh
vim ~/.bashrc
export GITHUB_USER=NOME_USUARIO
export GITHUB_TOKEN=TOKEN_GERADO
export DOCKERHUB_HOMOLOG_PASSWORD=PASS
export DOCKERHUB_PRODUCTION_PASSWORD=PASS
export USER=NAME_TO_SHOW_IN_SLACK # Opcional
source ~/.bashrc
```

## 2. Instalando o Docker

#### Mac OS

Segue o tutorial de [instalação do Docker](https://docs.docker.com/docker-for-mac/install/)

#### Fedora

Segue o tutorial de [instalação do Docker](https://docs.docker.com/install/linux/docker-ce/fedora/)

#### Ubuntu

Segue o tutorial de [instalação do Docker](https://docs.docker.com/install/linux/docker-ce/ubuntu/)

ATENÇÃO: Instalar o docker usando `apt snap` já gerou problemas na máquina dos devs

#### Arch/AntgergOS

```sh
sudo pacman -S docker
```

```sh
groups
sudo usermod -a -G docker $USER
sudo su - $USER
```

**(OBS: Após a instalação pode ser necessário relogar/reiniciar no sistema para ele reconhecer o grupo 'docker').**

### Docker compose

```sh
sudo curl -L "https://github.com/docker/compose/releases/download/1.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

Check if it worked:

```sh
docker-compose --version
```

**(OBS: Fazer logout do seu usuário linux caso não funcione).**

## 3. Configurando variáveis de ambiente

(Obs.: A partir desta etapa é necessário que o download do repositório já tenha sido concluido).

O script `$CLIPP_PATH/Cli/devops/cpf-variables` contém variáveis de
ambiente necessárias para o funcionamento do sistema, como: nome de
portas, servidores e outros. Para carregar estas variaveis adicione
ao arquivo `~/.bashrc` as linhas:

```sh
export CLIPP_PATH=SUBSTITUIR_AQUI_POR_CAMINHO_DO_PROJETO_COMPUFACIL
source $CLIPP_PATH/Cli/devops/cpf-variables
export PATH=$PATH:$CLIPP_PATH/Cli
```

Após configurado o arquivo `~/.bashrc`, execute o comando abaixo
para que as variaveis fiquem disponiveis para a utilização:

```sh
source ~/.bashrc
```

## 4. Rodando o Docker

#### Execução com instalação de todas as depências

(Obrigatório se for a primeira execução do `cpf-docker`):

Obs.: pode ocorrer conflito de portas, ver sessão **Conflito de portas e falta de requisitos**

Após a instalação, na primeira vez, rodar novamente para subir o serviço do docker

```sh
cpf-docker
```

## 5. Instalando o PHP e suas dependências

Nessa etapa será necessário ter o PHP instalado localmente. Caso não tenha, instale a versão 7.2.

Também será necessário instalar algumas extensões, como segue:

```sh
sudo apt install apt-transport-https lsb-release ca-certificates
sudo wget -O /etc/apt/trusted.gpg.d/php.gpg https://packages.sury.org/php/apt.gpg
echo "deb https://packages.sury.org/php/ $(lsb_release -sc) main" | sudo tee /etc/apt/sources.list.d/php.list
sudo apt install php7.2-dev -y
sudo apt install libcurl4-openssl-dev pkg-config libssl-dev -y

sudo apt install php7.2-curl php7.2-gd php7.2-intl php7.2-sqlite3 php7.2-soap php7.2-bcmath php7.2-memcached php7.2-mbstring php7.2-zip php7.2-gettext php7.2-xml
sudo pecl install mongodb
```

[Referência](https://www.colinodell.com/blog/201711/installing-php-72)
[Referência](https://thishosting.rocks/install-php-on-ubuntu/)


**Opcional** para não instalar dependências localmente, pode usar os comandos a seguir:

```sh
# PHP
docker run -v $(pwd):/home --workdir /home --user $(id -u):$(id -g) compufacil/php-composer php "$@"
```

```sh
# Composer
docker run -v $(pwd):/home --workdir /home --user $(id -u):$(id -g) compufacil/php-composer composer "$@"
```

Você pode adicionar como alias, utilizar como script em sua pasta `/usr/local/bin` ou da forma que achar mais adequado.


#### Mac OS PHP install

https://medium.com/@romaninsh/install-php-7-2-xdebug-on-macos-high-sierra-with-homebrew-july-2018-d7968fe7e8b8

#### Instalando composer/dependências

```sh
curl -sS https://getcomposer.org/installer | sudo php -- --install-dir=/usr/local/bin --filename=composer
cd $CLIPP_PATH/Backend
composer install
```

Caso haja algum problema durante a instalação, consulte a área
[Resolução de problemas](SettingDevelopmentEnvironment.md#user-content-resolução-de-problemas)

## 6. Build do front-end

Para fazer o build do front-end é necessário ter o Nodejs e o Yarn instalados localmente. Caso não possua algum deles instalado, pode verificar o os links abaixo:

- [Nodejs](https://nodejs.org/en/download/package-manager/)
- [Yarn](https://yarnpkg.com/lang/en/docs/install/)

```sh
cd $CLIPP_PATH/Frontend
make dev
make start
```

OBS: Somente utilizar, caso não localizar o comando node.

```sh
sudo ln -s /usr/bin/nodejs /usr/bin/node
```

## 7. Configurando Hosts

Adicione os domínios do back e front no arquivo `/etc/hosts` de seu sistema operacional:

```sh
127.0.0.1   app.clippfacil.local   clippfacil.local
127.0.0.1   app.clipp360.local   clipp360.local
```

Utilize endereço `http://clippfacil.local:8000` para acessar
o sistema em seu navegador e verificar seu funcionamento.

## 8. Copiando um banco de dados

````sh
cd $CLIPP_PATH
cpf-clone-remote-database.py --clean


#### É importante instalar e configurar o awscli (credenciais em secrets)

# Resolução de problemas/Extra

## Instalando o AWS Cli

#### Pelo Pip

```sh
pip install awscli --upgrade --user
````

#### Arch/AntgergOS/Ubuntu

```sh
sudo pacman -S aws-cli
sudo apt install awscli
```

Então defina as credenciais (para ter acesso as senhas ver (SecretsConfig.md)[./SecretsConfig.md])
```sh
aws configure
```

## Problema com permissão da pasta Frontend/dist

#### Fedora

```sh
chown -R root:docker dist
chmod -R g+rw dist
```

## Conflito de portas e falta de requisitos

Caso as portas necessárias para a execução do docker já estejam
sendo usadas por outros serviços alguns problemas podem vir a
ocorrer. Exemplos de conflitos:

`:80` Apache

`:3306` MySQL

`:11211` Memcached

Para resolução, pare os serviços conflitantes no host ou mude a porta.

Para resolução de outros problemas, certifique-se de que todas as extensões
requisitadas foram instaladas. Os comandos `cpf-diagnose` e `cpf-composer` podem
te auxiliar na verificação.

Certifique-se também a instalação dos drivers dos bancos de dados, utilizando:

```sh
sudo apt-get install php-mysql php-pgsql php-sqlite
```

Problemas ao rodar o comando `cpf-docker` pode ser solucionado deletando as imagens e rodando `cpf-docker` novamente:

```sh
docker rm -f $(docker ps -a -q)
docker rmi -f $(docker images -q)
```

### IPV6

### Metodo I:

Em alguns sistemas o docker pode apresentar problemas com o IPV6,
sendo assim, em alguns casos, o problema pode ser solucionado o
desabilitando editando/adicionando ao arquivo `/etc/default/grub`:

```sh
GRUB_CMDLINE_LINUX_DEFAULT="ipv6.disable=1"
```

E gerando um novo GRUB:

```sh
grub-mkconfig -o /boot/grub/grub.cfg
```

Após os passos anteriores, é necessário reiniciar o sistema operacional.

### Método II:

Caso não deseje desativar o IPV6 da sua maquina e/ou modificar o GRUB, pode
também ser uma possível solução diminuir a prioridade do IPV6 para que o
IPV4 seja o primeiro a buscar informações, usando o comando:

```sh
sudo sh -c "echo 'precedence ::ffff:0:0/96 100' >> /etc/gai.conf"
```

## Resolução de problemas - Alternativa

### Utilizando o Frontend com Base em Homolog

É possível utilizar a Base local do Frontend caso hajam problemas de instalação do
docker devidos a instalação em outros sistemas operacionais e/ou problemas não
mencionados no tópico de [Resolução de problemas](SettingDevelopmentEnvironment.md#user-content-resolução-de-problemas). Apontando
as configurações do Frontend para a Base de Homolog ignora-se a utilização da
instalação defeituosa do docker em maquina local.

No terminal, suba o Webservice local utilizando os comandos:

```sh
cd $CLIPP_PATH/Backend/public
sudo php -S 127.0.0.1:80
```

Verifique se o sistema está disponível acessando seu `localhost`.

No diretório `/Frontend/config` crie um novo arquivo chamado `config.local.json` e
adicione as seguintes linhas:

```sh
  "rpc_url": "http://app.homolog.clippfacil.com.br/rpc/v1",
  "rds_url": "http://app.homolog.clippfacil.com.br/report/v1",
  "s3_url": "http://compufour.s3.amazonaws.com/homolog/uploads/images"
```

Também veja: [desenvolvendo partes do sistema](desenvolvendo_partes_do_sistema).

### Erro de extensão do mongodb ao executar composer install ou pecl install mongodb

Caso houver erro relacionado ao mongodb, garantir que em php.ini exista a extensão habilitada  mongodb.so.

Localizar php.ini correto:

```sh
php -i | grep .ini
```
Identificar o caminho completo do php.ini através de "Loaded Configuration File"

Abrir arquivo como administrador:

```sh
sudo nano {caminho correto do arquio php.ini}
```

Adicionar extension=mongodb.so no arquivo php.ini

Executar composer install novamente:

```sh
composer install
```

# Frontend - Problemas com o watch

## Solving Frontend Watch problem on Ubuntu/Arch

```sh
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```

# Backend - Erro por falta de permissões nos containers

```sh
cpf-permissions-fix
```

# Docker - Problemas com containers

## Problema com container mlbRedirector

O container mlbRedirector sobe, porém cai logo em seguida, ficando com status exited. Se rodar os logs

```sh
docker logs compufacil_mlbRedirector_1
```

E obter a mensagem:

```
internal/fs/utils.js:298
    throw err;
    ^

Error: ENOENT: no such file or directory, open '/usr/src/app/certs/cert.pem'
```

Significa que está faltando os certificados. Para isso, gere um novo certificado para seu ambiente de desenvolvimento.

```sh
cd $CLIPP_PATH/DevOps/certificate/development && openssl req -newkey rsa:4096 \
            -x509 \
            -sha256 \
            -days 3650 \
            -nodes \
            -out cert.pem \
            -keyout key.pem
```

Feito isso, tente subir o containter novamente.

## Problema com containers webserver e cron

Após rodar o comando ```docker logs``` no container, se não for problema relacionado às migrations, tente rodar o comando

```sh
cd $CLIPP_PATH/Backend && composer dump-autoload
```

após isso, tente subir os containers novamente.

## Containter Webserver não levanta por problema de migrations no schema clean

Após rodar o comando `cpf-clone-remote-database.py --clean` e tentar levantar o container do webserver, seja por um `cpf-docker` ou `docker-compose up -d`, o container webserver fica em status exited, e ao verificar com o comando `docker logs` identificamos que é por problemas com as migrations.

Para corrigir isso, é necessário corrigir o schema da clean, para isso, siga os passos a seguir:

1. Clone a base de dados de homolog com o comando
```sh
cpf-clone-remote-database-py --homolog
```
2. Levante o container do webserver, com o comando `cpf-docker` ou `docker-compose up -d`
3. Navegue para a branch master
```sh
git checkout master
```
4. Rode os scripts para identificar as diferenças entre a base de dados e a base de código e execute as migrations, isso irá deixar o schema da sua base de dados local igual ao de produção
```sh
./compufacil-container migrations-diff
./compufacil-container migrations-diff --fiscal
./compufacil-container migrations-migrate
```
5. Exporte o conteúdo da tabela `migration_versions` das bases de dados de produção, tanto MySQL como Fiscal (PostgreSQL)

6. Remove o conteúdo da tabela `migration_versions` das bases de dados locais, tanto MySQL como Fiscal (PostgreSQL). MUITO CUIDADO NESSA ETAPA, PARA NÃO FAZER ISSO NO AMBIENTE DE PRODUÇÃO

7. Importe o conteúdo conteúdo da tabela `migration_versions` das bases de dados de produção, tanto MySQL como Fiscal (PostgreSQL), para as suas bases locais. Assim para o banco será como se apenas as migrations de produção tivessem sido executadas.

8. Exclua as migrations geradas no passo 4.

9. Execute o comando abaixo. Esse comando irá atualizar o schema clean que é baixado com o comando `cpf-clone-remote-database.py --clean` com base na sua base de dados local.
```sh
cpf-update-clean-database.py
```

10. Para garantir que a operação foi bem-sucedida, você pode navegar para a branch desejada, executar o comando abaixo e então tentar novamente levantar o container do webserver. Se o container ficar em pé sem ter problemas com as migrations, significa que deu tudo certo :)
```sh
cpf-clone-remote-database.py --clean
```
