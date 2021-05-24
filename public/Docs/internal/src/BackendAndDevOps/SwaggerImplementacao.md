# Implementação Swagger na compufácil

O principal projeto do *Swagger* é sua
[especificação](https://github.com/swagger-api/swagger-spec); ela
define as convenções de como as chamadas *HTTP* vão ser mapeadas
e disponibilizadas. Ao redor da especificação *Swagger* existe uma
variedade de aplicações que suportam a notação e possibilitam
diversas operações sobre serviços HTTP, uma delas é a documentação
de *API*s.

A especificação dos serviços HTTP no *Swagger* se dá por
meio de arquivos no formato *JSON*. Estes arquivos podem ser
gerados automaticamente, através de ferramentas que interpretam as
*annotations* no código fonte e geram a *spec*.

No caso do *Compufacil*, visto que os serviços já são parcialmente
documentados nos arquivos ``services.config.php``, foi desenvolvido um
conversor próprio que tira vantagem desta característica.

O conversor do *Compufacil* simplesmente lê as configurações
descritas em *PHP* (nos arquivos ``services.config.php``) e
traduz de acordo com as especificidades da notação *Swagger*.
O sistema responsável por esta conversão se encontra em
``compufacil/api/doc/``.

O conversor foi chamado de (*doc-sync*) pelo fato de que sua única
responsabilidade ser a de: ler os *services.config.php* e convertê-los
em documentação (Swagger). Em outras palavras, o *doc-sync* mantém a
documentação em sincronia com os arquivos ``services.config.php``.

Para criar uma documentação (sincronizar) basta rodar o comando ``sync.php``.

```
$ cd $CLIPP_PATH
$ make swagger
```

Os documentos gerados estarão dispostos no diretório
api/dynamic_doc/build.


## Utilizando os arquivos do Swagger

Com arquivos no padrão *Swagger* em mãos um leque de possibilidades
é aberto. Pode-se visualizar documentação, testar serviços, gerar
código para diversas linguagens, entre outras atividades; tudo
utilizando ferramentas que foram criadas ao redor da especificação
do *Swagger*.

### Swagger UI

O *Swagger* UI é um aplicativo web que interpreta arquivos no formato
*Swagger* e gera telas de documentação adequadas para seres humanos.
Além de fonte de documentação, as telas geradas pelo *SwaggerUI*
possibilitam testar os serviços "ao vivo".

#### Instalação

A instalação local do *SwaggerUI* padrão pode ser feita através do *npm*.

```
$ sudo npm install -g swagger-ui
```

Fora a instalação, nenhuma outra configuração faz-se necessária para o
*SwggerUI* funcionar.

Encontre o arquivo HTML do *SwaggerUi*  para processá-lo em seu navegador.

```
$ locate swagger-ui | grep dist | grep index.html
/usr/lib/node_modules/swagger-ui/dist/index.html

```
Ao renderizar este *HTML* em seu navegador você irá notar um *input* esperando
uma URL; nesta caixa devemos colocar o endereço do arquivo **api-docs.json**
gerado.

Infelizmente o arquivo no sistema de arquivos não é aceito; o
*SwaggerUI* espera um arquivo servido por um servidor Web. Sendo assim, o
próximo passo é configurar um endereço para disponibilizar o arquivo *JSON*.

## Atualizando a documentação

```
$ cd $CLIPP_PATH
$ make deploy_swagger
```

