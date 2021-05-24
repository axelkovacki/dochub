# AWS EC2 Operations

## Changing EC2 Instance Type keeping the root volume

More on how to attach/detach EBS volumes in the EC2 documentation:

- [Root Device Storage](http://docs.amazonwebservices.com/AWSEC2/latest/UserGuide/RootDeviceStorage.html)
- [Block Device Mapping](http://docs.amazonwebservices.com/AWSEC2/latest/UserGuide/block-device-mapping-concepts.html)
- [Detaching an Amazon EBS Volume from an Instance](http://docs.amazonwebservices.com/AWSEC2/latest/UserGuide/ebs-detaching-volume.html)
- [Attaching the Volume to an Instance](http://docs.amazonwebservices.com/AWSEC2/latest/UserGuide/ebs-attaching-volume.html)


- Go to EC2 console [here](https://sa-east-1.console.aws.amazon.com/ec2/v2/home?region=sa-east-1#Instances:sort=desc:tag:Name) and copy the **Instance ID**
- Select the instance and stop it (Actions > Instance state > Stop)
- Go to volume list [here](https://sa-east-1.console.aws.amazon.com/ec2/v2/home?region=sa-east-1#Volumes:sort=volumeId) and search the volume associated with the **Instance ID** copied (It is recommended that you give the volume a name to identify)
- Create a snapshot of the root volume (Select > Actions > Create snapshot)
- Go to snapshots [here](https://sa-east-1.console.aws.amazon.com/ec2/v2/home?region=sa-east-1#Snapshots:sort=desc:startTime)
- Register a new AMI using the snapshot (Select > Actions > Create image)
- In the option **Virtualization type** select **Hardware-assisted virtualization**
- Unselect **Delete on Termination** in the **Block Device Mappings** list
- Launch a new instance from the new AMI and select a new instance type
- Change the domain IP to the new instance IPv4 public IP on [Route 53](https://console.aws.amazon.com/route53/home)
- Leave the swarm from the new manager instance and the workers instances (`docker swarm leave -f`)
- Login dockerhub (production/homolog) into the all machines (manager and workers)
- Configure the swarm again and then deploy
