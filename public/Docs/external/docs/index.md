Integrando a API da CompuFácil
==============================

A API da CompuFácil segue o padrão RPC. E o tráfego de dados é
através de JSON.

Ambientes
---------

Existem dois ambiente servindo a API. O ambiente de homologação e
de produção.

- **Produção**: https://app.clippfacil.com.br
- **Homologação**: http://app.homolog.clippfacil.com.br

Nas demais demonstrações vamos usar a variável AMBIENTE para
demonstrar o ambiente.

```
export AMBIENTE=http://app.homolog.clippfacil.com.br
```


Padrão dos serviços
-------------------

Todos os serviços seguem a seguinte nomenclatura:

```sh
$AMBIENTE/rpc/v1/$MODULO.$SERVICO
```

Módulo e serviço variam de acordo com o que parte do sistema está sendo utilizada.

### Exemplo:

```sh
#listar nfe's
http://app.homolog.clippfacil.com.br/rpc/v1/fiscal.get-nfe
#criar nfe
http://app.homolog.clippfacil.com.br/rpc/v1/fiscal.post-nfe
#atualizar nfe
http://app.homolog.clippfacil.com.br/rpc/v1/fiscal.put-nfe
#deletar nfe
http://app.homolog.clippfacil.com.br/rpc/v1/fiscal.delete-nfe

```


Autenticação
------------

A autenticação se dá através do seguinte serviço:

```sh
curl "$AMBIENTE/rpc/v1/application.authenticate" \
-H 'Content-Type: application/json' \
--data '
{
    "login": "teste@gmail.com",
    "password": "teste"
}
'

```

Na resposta de uma autenticação com sucesso conterá o token que
dever ser trafegado nas requisições autenticadas.

```json
{
    "status": 1,
    "access_token": "1be2b89c92aff78f9ffae8b408d80b2c2d8bcf0a",
    "default_lang": "pt_BR",
    "is_admin": true
}

```

Usaremos a variável token para demonstrações daqui em diante.
```sh
export TOKEN=1be2b89c92aff78f9ffae8b408d80b2c2d8bcf0a

```

Serviços
--------

Os demais serviços seguem o mesmo padrão da autenticação, com a
única diferença que trafegam o token no header *Authorization-Compufacil*.

### Exemplo fazendo o CRUD de receitas

**Lista receitas**

```sh
curl "$AMBIENTE/rpc/v1/finance.get-revenue" \
-H "Authorization-Compufacil: $TOKEN"
```

**Cria receita**

```sh
curl "$AMBIENTE/rpc/v1/finance.post-revenue" \
-H "Authorization-Compufacil: $TOKEN" \
-H "Content-Type: application/json" \
--data '
{
    "description": "teste teste",
    "value": 666
}
'
$ {"id":152611}
export REVENUE_ID=152611
```

**Pega 1 receita detalhada**

```sh
curl "$AMBIENTE/rpc/v1/finance.get-revenue" \
-H "Content-Type: application/json" \
-H "Authorization-Compufacil: $TOKEN" -d '{"id": '$REVENUE_ID'}'

```

**Atualiza uma receita**


```sh
curl "$AMBIENTE/rpc/v1/finance.put-revenue\
-H "Authorization-Compufacil: $TOKEN" \
-H "Content-Type: application/json"
--data '
{
    "description": "teste teste",
    "value": 666,
    "id": $REVENUE_ID
}'

$ {"id":152611}
```

**Deleta receita**


```sh
curl "$AMBIENTE/rpc/v1/finance.delete-revenue"  \
-H "Authorization-Compufacil: $TOKEN" \
-H "Content-Type: application/json" \
--data '{"id": $REVENUE_ID}'
$ {"id":152611}
```

Swagger
-------

Para uma referência completa dos serviços você pode consultar
[o nosso swager]( http://swagger.clippfacil.com.br/)
. Lá também é possível executar os serviços
diretamente contra homolog.

[Nosso blog contém um
post](https://techblog.clippfacil.com.br/documenta%C3%A7%C3%A3o-din%C3%A2mica-com-o-swagger-b6592888e994) explicando seu uso.

Contato
-------

Qualquer dúvida sobre a API entre em contato com nosso time
técnico. Através do e-mail contato@clippfacil.com.br.
