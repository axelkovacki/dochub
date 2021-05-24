## Resizing EC2 instance volume

https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/recognize-expanded-volume-linux.html

`growpart [OPTIONS] DISK PARTITION-NUMBER`

```sh
$ lsblk
NAME          MAJ:MIN RM SIZE RO TYPE MOUNTPOINT
nvme0n1       259:0    0  16G  0 disk
├─nvme0n1p1   259:1    0   8G  0 part /
└─nvme0n1p128 259:2    0   1M  0 part
```

So to grow the partition, we use the diskname nvme0n1 (see disk under TYPE) and desired partition is 1

```sh
sudo growpart /dev/nvme0n1 1
And then to extend the fs -  resize2fs device [ size ]
```

(device refers to the location of the target filesystem)

```sh
$ df -h
Filesystem                                 Size  Used Avail Use% Mounted on
devtmpfs                                   470M   52K  470M   1% /dev
tmpfs                                      480M     0  480M   0% /dev/shm
/dev/nvme0n1p1                             7.8G  7.7G  3.1M 100% /
```

So to extend the fs, we use the device name /dev/nvme01np1:

`sudo resize2fs /dev/nvme0n1p1`
Voila!

```sh
$ df -h
Filesystem                                 Size  Used Avail Use% Mounted on
devtmpfs                                   470M   52K  470M   1% /dev
tmpfs                                      480M     0  480M   0% /dev/shm
/dev/nvme0n1p1                              16G  7.7G  7.9G  50% /
```
