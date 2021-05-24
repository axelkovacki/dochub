# Asaas

 - [Documentacao API](http://docs.asaasv3.apiary.io/)
 - [Documentação geral](https://www.asaas.com/documentacao/faq-asaas/)

### Variáveis no sistema:
- CPF_ASAAS_TOKEN


### Fazendo requisições
```sh
#homolog
export TOKEN=6cb3fac118cb9e1cfd847b7e1961c4b3d47049c60f1cb0cffc0f17c0a95093d0
export URL=https://sandbox.asaas.com

#production
export URL=https://www.asaas.com
export TOKEN=4b24da0e742d2ffe84297a4c6732cdaee8b4c68b78a2bce7787e905875fdc907
#listando clientes
curl -H "access_token: $TOKEN" "$URL"/api/v3/customers

#criando cliente
curl -X POST $URL/api/v3/customers -H "Content-Type: application/json" -H "access_token: $TOKEN" -d '
{
    "name": "Compufacil",
    "email": "j34nc4rl0+666@gmail.com.br",
    "company": "Compufacil",
    "phone": "(49)88157629",
    "mobilePhone": null,
    "address": "Rua Sepe",
    "addressNumber": "1758",
    "complement": null,
    "province": "Centro",
    "postalCode": "95555000",
    "cpfCnpj": "94753993000205",
    "personType": null,
    "additionalEmails": null,
    "externalReference": null,
    "notificationDisabled": false,
    "city": 14889,
    "state": "RS",
    "country": "Brasil",
    "foreignCustomer": false
}
'


export CUSTOMER_ID=cus_000000022010

#criando subscription
curl -X POST $URL/api/v3/subscriptions -H "Content-Type: application/json" -H "access_token: $TOKEN" -d '
{
  "customer": "cus_000000022010",
  "billingType": "CREDIT_CARD",
  "nextDueDate": "2017-04-19",
  "value": 19.9,
  "cycle": "MONTHLY",
  "description": "Assinatura Plano Pro",
  "creditCard": {
    "holderName": "Compufacil",
    "number": "5105105105105100",
    "expiryMonth": "05",
    "expiryYear": "2021",
    "ccv": "318"
  },
  "creditCardHolderInfo": {
    "name": "Compufacil",
    "email": "j34nc4rl0+666@gmail.com.br",
    "cpfCnpj": "24971563792",
    "postalCode": "89223-005",
    "addressNumber": "277",
    "addressComplement": null,
    "phone": "4738010919",
    "mobilePhone": "47998781877"
  }
}
'

export SUBSCRIPTION_ID=sub_0xqbJhYUodjt
```

## Our system

The reference on our system to the asaas client id is ApplicationClient.paymentIdentifier.


## How to change a payment from a client to another

This method is useful is some user has to client accounts by
mistake, uses one and paid another.

```sh
# disable the current subscription of the used account
update ApplicationSubscription set status=2 where id=8903;
# change the paid subscription from the paid client to the used client
update ApplicationSubscription set client_id=7451 where id=8854;
# set the used account client.paymentIdentifier as the paid one
update ApplicationClient set paymentIdentifier = "cus_000001151059" where id =  7451;
# delete the paid client
```

