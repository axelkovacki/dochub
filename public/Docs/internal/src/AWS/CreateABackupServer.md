## Creating a server to run docker with ClippFacil stack for backup

**SHUT OFF SERVER AFTER COMPLETING BACKUP**

Go to EC2 instances in AWS Console [here](https://sa-east-1.console.aws.amazon.com/ec2/v2/home?region=sa-east-1).

Launch a new instance and select the appropriate configurations.
- Recommended:
    - AMI: Community AMIs > Ubuntu > Latest image HVM-SSD 64 bits
    - Instance type: t3a.small
    - Storage: General Purpose SSD (gp2)
    - Security group: Select an existing security group > launch-wizard-7
    - Key pair (.pem file to SSH access): Existing key pair > clippAWS
At EC2 instances list select the new instance and copy the **public IP address**

EC2 instances that will run of the containers configured in `docker-compose-backup.yml`.

- Access via SSH
- Install docker
- Ajust timezone
- Add the user to docker and then reboot

```sh
cpf-ssh.sh 00.000.000.00 # <- The server instance public IP

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt-get update
sudo apt-get install -y docker-ce
sudo timedatectl set-timezone 'America/Sao_Paulo'
sudo usermod -aG docker ${USER}
sudo reboot
```

- Send required files to server
- Login to docker hub (user and password in secrets)
- Install docker-compose
- Create docker volumes in server and start docker
- Run backup command (Mysql included in background see extra for more details)
- Access database

```sh
cpf-send-to-remote.sh --backup $CLIPP_PATH/docker-compose-backup.yml /tmp/ # from your local
cpf-send-to-remote.sh --backup $CLIPP_PATH/DevOps/docker/mysql.cnf /tmp/
cpf-send-to-remote.sh --backup $CLIPP_PATH/Cli/database/cpf-database-mirror-backup.sh /tmp/
cpf-send-to-remote.sh --backup $CLIPP_PATH/Cli/database/cpf-dbconn.sh /tmp/
cpf-send-to-remote.sh --backup DATABASE_FILES /tmp/

cpf-ssh.sh 00.000.000.00 # <- The server instance public IP
echo $DOCKERHUB_PASSWORD | docker login --username $DOCKERHUB_USERNAME --password-stdin
sudo apt install docker-compose

(cd /var/lib && sudo mkdir -p clippfacil/{fiscal,storage,mysql,mongo}) # <- This volumes can be found in docker-compose-backup.yml
sudo mv /tmp/docker-compose-backup.yml /tmp/docker-compose.yml
sudo mv /tmp/mysql.cnf /var/lib/clippfacil/
cd /tmp && docker-compose up -d

./cpf-database-mirror-backup.sh homolog|production --cached
./cpf-dbconn.sh
```

## Extra:

#### Command to export query from MySQL
- **Remeber mysqldump add a drop table before include data,
    do not execute a pure mysqldump in production**
- See `$CLIPP_PATH/Docs/internal/src/AWS/PerformBackup.md` for more details

```sh
docker exec -it "MYSQL_CONTAINER_ID" bash -c "mysqldump --tables myTable --where='id < 1000'"
```

#### Mysql background run:

    The command will run in back group because **&** at end of insert `[...] < /tmp/mysql.sql &`
