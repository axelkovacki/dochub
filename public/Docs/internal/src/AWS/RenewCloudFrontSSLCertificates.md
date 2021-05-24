## Renewing AWS CloudFront SSL Certificates

### Renew by automatic mode:

Use the script to generate Certificates:

```sh
cpf-renew-cloudfront-ssl.sh [server]
```

And do only step 3 of `Renew by manual mode`

OBS: If certificate do not renewed you may need to check http and https ports used by s3 bucket.
You can check this under `Origins and Origin Groups` in CloudFront distribution options.
If distribution uses port 80, reset the configuration edit and set bucket again.

### Renew by manual mode:

### Step 1

- Login at AWS Management Console
- Access CloudFront [https://console.aws.amazon.com/cloudfront/home]()
- Click on the distribution ID


1º:
- Go to tab 'Behaviors' -> Select -> Edit
- In 'Viewer Protocol Policy' select 'HTTP and HTTPS'
- At bottom click 'Yes, Edit' to save

2º (Somente se o certificado estiver vencido):
- Go to tab 'General' -> Select  -> Edit
- In 'SSL Certificate' select 'Default CloudFront Certificate (\*.cloudfront.net)'
- At bottom click 'Yes, Edit' to save

### Step 2

Access server production via SSH:

```sh
cpf-ssh.sh --production
sudo su
```

Info about letsencrypt with AWS cloudfront [here](https://medium.com/@richardkall/setup-lets-encrypt-ssl-certificate-on-amazon-cloudfront-b217669987b2).

Run letsencrypt S3 command:

```sh
AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY \
        letsencrypt --agree-tos -a letsencrypt-s3front:auth -i letsencrypt-s3front:installer \
        --letsencrypt-s3front:auth-s3-bucket {S3_BUCKET_NAME} \
        --letsencrypt-s3front:auth-s3-region sa-east-1 \
        --letsencrypt-s3front:installer-cf-distribution-id '{DISTRIBUTION_ID}' \
        -d {DOMAIN} --renew-by-default
```

Go to `/etc/letsencrypt/archive/` and compress the new certificate generated:

```sh
tar -czvf /tmp/{DOMAIN}.tar.gz {DOMAIN}/ --absolute-names
chmod 644 /tmp/{DOMAIN}.tar.gz
```

Go to your local and download from server and extract keys:

```sh
cpf-get-from-remote.sh --production /tmp/{DOMAIN}.tar.gz /tmp/
cd /tmp
tar -xzvf {DOMAIN}.tar.gz
```

### Step 3

- Go to your AWS Certificate Manager and select **N. Virginia** *region* [https://console.aws.amazon.com/acm/home?region=us-east-1#/]()
- Click on **Import a certificate**
- Copy `cert.pem` (the most recent generated) content into **Certificate body** field
- Copy `privkey.pem` (the most recent generated) content into **Certificate private key** field
- Copy `chain.pem` (the most recent generated) content into **Certificate chain** field
- Click on **Review and import**

### Step 4

- Undo the step 1
- Access CloudFront [https://console.aws.amazon.com/cloudfront/home]()
- Click on the distribution ID

1º:
- Go to tab 'Behaviors' -> Select -> Edit
- In 'Viewer Protocol Policy' select 'Redirect HTTP to HTTPS'
- At bottom click 'Yes, Edit' to save

2º (Somente se o certificado estiver vencido):
- At general click 'edit' and select 'Custom SSL Certificate' and select the new one
- At bottom click 'Yes, Edit' to save
