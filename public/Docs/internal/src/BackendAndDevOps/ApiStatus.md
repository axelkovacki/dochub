# ApiStatus

A api do ClippFácil trabalha com um conjunto bem definido de
status para representar os estados do sistema.

A lista completa dos status contidos no sistema encontra-se em
*Appication\\Model\\HttpStatus*

```
    const DENIED = 401;
    //subscription expired
    const EXPIRED = 419;
    const INVALID = 403;
    const VALID = 200;
    //multiple clients - choose one
    const MULTIPLE_CHOICES = 300;
    //no more acess on the system due missing of payments
    const LOCKED = 423;
    //there is no payment available
    const PAYMENT_REQUIRED = 402;
    //the information about payment is missing
    const PRECONDITION_REQUIRED = 428;
    const SERVICE_GONE = 410;
```


## 423 - Inscrição limitada

Quando a inscrição está limitada alguns recursos do sistema não
são mais acessíveis. Resumidamente: UPDATES e DELETES.

## 428 - Informação de pagamento não existente

Quando o cliente se cadastra no sistema em uma conta paga e ainda
não informou o método de pagamento.

## 402 - Inscrição bloqueada

Acontece ao se passar o tempo de exipiração sem adicionar pagamento.
Quando a inscrição está bloqueada quase todos os recursos do
sistema são negados. Em geral apenas os serviços de pagamento  da
subscrição são liberados.
