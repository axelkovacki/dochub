# Docker Swarm Manager Server

## Creating a docker swarm manager server

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
Install docker:
```sh
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt-get update
sudo apt-get install -y docker-ce
```
Add the user to docker and then reboot:
```sh
sudo usermod -aG docker ${USER}
sudo reboot
```
Access again and login to docker hub:
```sh
cpf-ssh.sh 00.000.000.00 # <- The worker instance public IP
echo {DOCKERHUB_PASSWORD} | docker login --username {DOCKERHUB_USERNAME} --password-stdin
```

Access a manager and create folders /data with have dependences on volumes decribed docker-compose-{homolog|production}.yml

Init swarm and deploy to manager:
```sh
cpf-ssh.sh --homolog|--production
docker swarm init
docker stack deploy --compose-file /tmp/docker-compose-{homolog|production}.yml {homolog|production} --with-registry-auth
```

Intall awscli
Enter in secrets file to get data to configure aws in the manager
```sh
sudo apt install awscli
aws configure
```

Create Route 53 configuration for listen to new IP address.
Configure SSL to new domain using `Docs/internal/src/AWS/RenewBackendSSLCertificates.md` reference.
Set domain in `Backend/config/apache.{production|homolog}.conf`
Then make deploy to domain.
