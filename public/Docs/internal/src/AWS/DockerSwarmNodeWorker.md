# Docker Swarm Workers

## Creating a docker swarm node worker

EC2 instances that will run of the containers configured in `docker-compose-{homolog|production}.yml`.

Only the nodes with role workers will run in these instances.

Go to EC2 instances in AWS Console [here](https://sa-east-1.console.aws.amazon.com/ec2/v2/home?region=sa-east-1).

Launch a new instance and select the appropriate configurations.
- Recommended:
    - AMI: Community AMIs > Ubuntu > Latest image HVM-SSD 64 bits
    - Instance type: t3.small
    - Storage: General Purpose SSD (gp2)
    - Security group: Select an existing security group > launch-wizard-7
    - Key pair (.pem file to SSH access): Existing key pair > clippAWS
At EC2 instances list select the new instance and copy the **public IP address**

Access via SSH:
```sh
cpf-ssh.sh 00.000.000.00 # <- The worker instance public IP
```
Install docker and ajust timezone:
```sh
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt-get update
sudo apt-get install -y docker-ce
sudo timedatectl set-timezone 'America/Sao_Paulo'
```
Add the user to docker and then reboot:
```sh
sudo usermod -aG docker ${USER}
sudo reboot
```
Access again and login to docker hub (user and password in secrets):
```sh
cpf-ssh.sh 00.000.000.00 # <- The worker instance public IP
echo $DOCKERHUB_PASSWORD | docker login --username $DOCKERHUB_USERNAME --password-stdin
```

## IMPORTANT
You need to add the IP node in the PostgreSQL database into XML storage machine and **restart** Postgres service
```sh
cpf-ssh.sh --storage
vim /etc/postgresql/11/main/pg_hba.conf
systemctl restart postgresql
```

Access a docker swarm **manager** instance and get the join-token:
```sh
cpf-ssh.sh --homolog|--production
docker swarm join-token worker
```
Copy the output and run into the worker instance:
```sh
cpf-ssh.sh 00.000.000.00 # <- The worker instance public IP
docker swarm join --token {TOKEN} 172.00.00.000:2377 # <- this is a example
```
Access a **manager** then deploy:
```sh
cpf-ssh.sh --homolog|--production
docker stack deploy --compose-file /tmp/docker-compose-{homolog|production}.yml {homolog|production} --with-registry-auth
```

### Extra

To leave a node from the docker swarm stack:
```sh
cpf-ssh.sh 00.000.000.00 # <- The worker instance public IP
docker swarm leave -f
```
