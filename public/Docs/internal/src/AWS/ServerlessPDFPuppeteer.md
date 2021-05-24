## Serverless PDF Puppeteer

Clippfacil use a serverless application to convert HTML to PDF using Puppeteer.

To do this the **AWS API Gateway** is used to run a **Lambda function** that convert and return the PDF binary or base 64 encoded.

Original open source Github repository
https://github.com/crespowang/serverless-lambda-puppeteer

Author tutorial on how to configure
https://medium.com/swlh/how-to-create-pdf-in-lambda-using-puppeteer-6355348b8a82?

Compufour fork repository adapted to Clippfacil use
https://github.com/compufour/serverless-lambda-puppeteer

To test PDF generation locally
```sh
cd $PUPPETEER_PATH # Path where is your puppeteer repository files
yarn serverless
curl -X GET http://localhost:3003/dev/puppeteer/pdf?reportUrl=http%3A%2F%2Fcompufour.s3.amazonaws.com%2Fproduction%temp%2Ffile.html
```

**IMPORTANT** Configure the AWS credentials in your local machine with clippfacil profile
```sh
aws configure --profile clippfacil
```
