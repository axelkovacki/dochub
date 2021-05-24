# Filas

Na Compufácil usamos o rabbitMQ como sistema de mensageria e para evitar problemas de má utilização o estudo e entendimento dos componentes do rabbitMQ é muito importante, para saber mais informações sobre os componentes, por favor acesso [este artigo](http://nelsonsar.github.io/2013/10/29/AMQP-building-blocks.html)!

# Usando o sistema de filas
## Para enviar uma mensagem:

A principal abstração criada é a do `QueueSender` que pode ser usada para enviar mensagens para queues específicas.
> O sistema implementado para o envio de mensagens está ignorando a existência dos exchanges e demais componentes, por isso ele não executa nenhum `dechare`.

```php
$sender = $serviceLocator->get('QueueSender');
$sender->send('queueIdentifier',  ['my' => 'data']);
```

## Para consumir uma mensagem

Devido a inúmeros problemas e fragilidade do setup anterior, os consumers foram migrados para um sistema feito em go chamado [message-cannon](https://github.com/leandro-lugaresi/message-cannon).
Com ele resolvemos os problemas de instabilidade e simplificamos todo o sistema de consumers.
Com isso nós separamos os consumers do código sendo executado, os consumers ficam todos dentro do message-cannon, o consumer, ao receber uma mensagem a mesma é enviada para ser executada por algum serviço. Podendo enviar pelo stdin de um cli ou por http.

### Arquivo de configuracão

Todas as configuracões relacionadas aos consumers estão no arquivo `Backend/config/cannon.yml`
Nele temos os principais blocos: `connections`, `exchanges`, `dead_letters`, `consumers`.

#### Connections
É possível ter mais de um conexão e cada consumer pode escolher qual utilizar. Isso é útil principalmente se os consumers usam diferentes vhosts.

```yaml
connections:
    default:
      dsn: "amqp://${RABBITMQ_USER:=guest}:${RABBITMQ_PASSWORD:=guest}@${RABBITMQ_HOST}:${RABBITMQ_PORT:=5672}/${RABBITMQ_VHOST:=}"
      timeout: 1s
      sleep: 50ms
```
O sistema do message-cannon suporta variáveis de ambiente dentro do yaml, para isso basta utilizar `${NOME_VARIAVEL}` e essa variável será trocada pelo seu valor ao iniciar o sistema. Para adicionar um valor default pode ser utilizado o seguinte formato: `${NOME_VARIAVEL:=valor}`
> CUIDADO: Se a variável não possuir um valor default e não estiver setada, o message cannon irá retornar um erro e não iniciar devidamente.

O message-cannon um sistema de retry para iniciar as conexões, isso é importante principalmente para evitar erros ao iniciar os containers e o rabbitMQ não estar aceitando conexões. Ao abir uma conexão o sistema faz 3 tentativas. O paramentro `timeout` serve para configurar o tempo limite de espera ao iniciar a conexão e o `sleep` para o tempo de espera até a próxima tentativa. Esses valores são objetos time.Time do Go, dessa forma é possível passar por exemplo: `300ms`, `3s`, `1m`.

#### options
> A maioria dos blocos recebem Options, como todos possuem basicamente os mesmos options essas opcões são as mesmas para todos eles (consumers, exchanges, queues e deadletters) sendo que o default de cada option é `false`, assim apenas as opções que serão diferentes precisam ser colocadas na configuracão.

Estas são as opcões disponíveis:
```yaml
  options:
    durable: false
    auto_delete: false
    exclusive: false
    no_wait: false
    no_local: false
    auto_ack: false
    args:
      arg-name: value # can be int, str or float
      x-delayed-type: topic
```

#### Exchanges

 Cada item é uma declaracão de um exchange. ex:
```yml
    command-bus:
      type: x-delayed-message
      options:
        durable: true
        args:
          x-delayed-type: topic

```

#### Deadletters

Como as queues são declaradas dentro dos consumers, as queues utilizadas por deadletters são declaradas separadamente.
ex:
```yaml
  dead_letters:
    fallback:
      queue:
        name: fallback
        options:
          args:
            x-dead-letter-exchange: ""
            x-message-ttl: 300000
        bindings:
          -
            routing_keys: ["#"]
            exchange: fallback
```
Para mais informacões como deadletters funcionam, [acesse aqui](https://www.rabbitmq.com/dlx.html).

#### Consumers

O consumer é o componente principal do message-cannon nele definimos a queue que deve ser criada para o consumer, para onde as mensagens serão enviadas e demais opções, abaixo você pode ver as configurações de um consumer.

ex:
```yaml
  consumers:
    commandbus:
      connection: default
      workers: 1 # Qantidade máxima de mensagens sendo executadas de forma concorrente
      prefetch_count: 10 # Quantidade de mensagens que o rabbitMQ manda para o cliente cada vez, poucas mensagens = muitos pacotes tcp sendo transmitidos.
      dead_letter: fallback # chave de um deadletter, irá buscar elo nome e declarar ele antes de declarar a queue principal.
      queue: # dados da queue sendo declarada
        name: commands-webpdv
        options: # mesmos options que os outros componentes
          durable: true
          args:
            x-dead-letter-exchange: fallback
            x-dead-letter-routing-key: commands-webpdv
        bindings: # Bindings entre exchanges e está queue, uma queue pode ter multiplos bindings, por esse motivo essa config é um array
          -
            routing_keys: # Routing keys utilizadas por este bind
              - 'webpdv.#'
            exchange: command-bus # nome do exchange, ele presente dentro do `exchanges`
      runner: # O runner é o componente que irá enviar as mensagens para os sistemas
        type: http # opcões: http e command
        options: # estas opcões são especificas de cada tipo de runner
          url: ${CLIPP_URL}/rpc/v1/core.command-bus.json
          return-on-5xx: 3 # ExitNACK - constante usada para caso o server responda com algum erro 500
          headers: # qualquer header que deva ser enviado junto com a mensagem
            Authorization: Basic YWxhZGRpbjpvcGVuc2VzYW1l
            Content-Type: application/json
```

### recebendo mensagens

Estamos utilizando o http runner para servicos que não são muito demorados, caso a mensagem sendo consumida possa demorar minutos para ser processada, a melhor opção é a utilização de um command para essa operação.

Para receber mensagens por http basta criar um service dentro de algum módulo do compufacil e o serviço deve retornar um json contendo o atributo `response-code`, se esse atributo não estiver presente ele irá considerar o response code do http, sendo 200OK para o ack e os 5xx para para o que estiver configurado no atributo `return-on-5xx` do http runner.

ex:

```php
//No arquivo service.config.php
'destinationIdentifier' => [
    'class' => SomeClass::class,
    'method' => 'somemethod'
    'authorization' => false,
]

//someclass.php

use Core\Queue\Cannon;

class SomeClass {

    public function somemethod(array $msg)
    {
        print($msg);
        #['my' => 'data']
        return Cannon::ack()
    }
}
```

## Testando o consumer fora do código

```sh
./compufacil-container consumer-send-message destinationIdentifier '{\"my\": \"data\"}'
```

## Exemplos executando fila via cURL
```sh
curl 'http://app.clippfacil.local/rpc/v1/core.GenerateReportConsumer' -X POST -H 'cannon-authorization: uswkFuvi5fnwKurmxecAszcdLpcxmenacdtp2utabeztvpjtcc9xwJeixeewcjngxqdcryphjrztiyijfgwkspkmvuwfxn' -H 'Content-Type: application/json' -d '{"type":"report.finance.movimentation-checkout.generate","payload":{"filters":{"fromDate":"2021-02-01","toDate":"2021-04-26","checkout":{"value":"001"},"auth-token":"9da6f21ebe04ed0f0ec020906bb76f16f576d226"}},"client_id":3412,"user_id":5176}'

curl 'http://app.clippfacil.local/rpc/v1/core.GenerateReportConsumer' -X POST -H 'cannon-authorization: uswkFuvi5fnwKurmxecAszcdLpcxmenacdtp2utabeztvpjtcc9xwJeixeewcjngxqdcryphjrztiyijfgwkspkmvuwfxn' -H 'Content-Type: application/json' -d '{"type":"report.inventory.report-price-list.generate","payload":{"filters":{"fromDate":"2018-02-06","toDate":"2018-03-06"},"auth-token":"69993c1b10748a8f3da28992055027ec6ea4b7f3"},"client_id":3056,"user_id":4639}'

curl 'http://app.clippfacil.local/rpc/v1/inventory.ConverterConsumer' -X POST -H 'cannon-authorization: uswkFuvi5fnwKurmxecAszcdLpcxmenacdtp2utabeztvpjtcc9xwJeixeewcjngxqdcryphjrztiyijfgwkspkmvuwfxn' -H 'Content-Type: application/json' -d '{"recipientClient":"converter0206.5@compufour.com","client":"jean@compufour.com.br","lines":{"1":"519|||519|Produto 1|LT|5,5|6,7|10.03.2020|0|2|1|Andreia|1|Mercadoria para revenda|Adicional 1|Adicional 2|||Produtos de Limpeza|Complementar|12345678|87654321|7,1|6|2|0|25.02.2019|3,3|5||41|50|99|99|5|5|A|P|39069019|101|5|||||N|||||5913|5913|1002200|999|Não Tributado|Obse Andréia","2":"472|||472|Produto 1|LT|5,5|6,7|10.03.2020|0|2|1|Andreia|1|Mercadoria para revenda|Adicional 1|Adicional 2|||Produtos de Limpeza|Complementar|12345678|87654321|7,1|6|2|0|25.02.2019|3,3|5||41|50|99|99|5|5|A|P|39069019|101|5|||||N|||||5913|5913|1002200|999|Não Tributado|Obse Andréia","0":"0|ID_IDENTIFICADOR|COD_LST|COD_NBS|ID_ESTOQUE|DESCRICAO|UNI_MEDIDA|PRC_CUSTO|PRC_VENDA|UTL_VENDA|MARGEM_LB|POR_COMISSAO|ULT_FORNEC|NOME|ID_TIPOITEM|TIPO_ITEM|ADICIONAL1|ADICIONAL2|ID_INDEXADOR|INDEXADOR|GRUPO|DESC_CMPL|COD_BARRA|REFERENCIA|PRC_MEDIO|QTD_ATUAL|QTD_MINIM|QTD_INICIO|ULT_COMPRA|PESO|IPI|CF|CST|CST_IPI|CST_PIS|CST_COFINS|PIS|COFINS|IAT|IPPT|COD_NCM|CSOSN|MVA|ID_NIVEL1|NIVEL1|ID_NIVEL2|NIVEL2|GRADE_SERIE|ISS_ALIQ|ANP|FCI|PRC_ATACADO|CFOP_NF|CFOP_CF|COD_CEST|CENQ|TRIBUTACAO|OBSERVACAO"}}'

curl 'http://app.clippfacil.local/rpc/v1/inventory.MercadoLivreProductConsumer' -X POST -H 'cannon-authorization: uswkFuvi5fnwKurmxecAszcdLpcxmenacdtp2utabeztvpjtcc9xwJeixeewcjngxqdcryphjrztiyijfgwkspkmvuwfxn' -H 'Content-Type: application/json' -d '{"idsProductsMLB":[1],"idsProducts":[3103],"clientEmail": "jean@compufour.com.br", "token":"APP_USR-6428232595103166-100817-ab668184c133219f2bd71bc245905fa7-324894291"}'

curl 'http://app.clippfacil.local/rpc/v1/inventory.EcommerceConsumer' -X POST -H 'cannon-authorization: uswkFuvi5fnwKurmxecAszcdLpcxmenacdtp2utabeztvpjtcc9xwJeixeewcjngxqdcryphjrztiyijfgwkspkmvuwfxn' -H 'Content-Type: application/json' -d '{"idsProductsEcommerce":[354,355],"idsProducts":[115544,115553],"clientEmail": "andreiaecommerce9@compufour.com"}'

curl 'http://app.clippfacil.local/rpc/v1/application.C4ClientRegister' -X POST -H 'cannon-authorization: uswkFuvi5fnwKurmxecAszcdLpcxmenacdtp2utabeztvpjtcc9xwJeixeewcjngxqdcryphjrztiyijfgwkspkmvuwfxn' -H 'Content-Type: application/json' -d '{"idsProductsEcommerce":[354,355],"idsProducts":[115544,115553],"clientEmail": "andreiaecommerce9@compufour.com"}'
```

## Vendo itens que estão na fila do RabbitMQ (local e remoto)

```sh
cpf-show-items-on-queue.sh # local
cpf-show-items-on-queue.sh [--production|--homolog] # remoto
```
