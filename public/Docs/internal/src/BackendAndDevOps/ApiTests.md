# Testes de Api

Os testes de API servem para garantir a confiabilidade dos serviços a nível HTTP. No Clipp utilizamos o (pyresttest)[https://github.com/svanoort/pyresttest] como *framework* de testes de API.

Para uma introdução e detalhes de como o pyresttest é utilizado no Clipp veja [este post](http://www.jeancarlomachado.com.br/post/visualizar/00041/testes-de-api-com-o-pyresttest).

Para uma visão profunda veja a [documentação oficial](https://github.com/svanoort/pyresttest).

## Regras Gerais

Para cada novo serviço implementado um novo teste de API deve ser criado.
A maioria das vezes apenas um teste é o suficiente - o teste de caso de sucesso.
Os testes devem ser auto suficientes, isso significa que caso eles
necessitem de algum recurso eles devem criá-lo, utilizando outras
API's, e posteriormente limpando estes mesmos recursos. Em outras
palavras, se um teste de api está testando a atualização de dados de
usuário, primeiramente este teste deve criar um usuário e no final do
processo deletá-lo.

## Setup

Para instalar temporariamente o pyresttest em sua máquina rode:

```
clipp-pyresttest-install
```

Por fim, como especificado na saída do comando anterior, rode:

```
export PYTHONPATH=/tmp/api-test/lib/python2.7/site-packages
```

**OBS: este script instala o pyresttest em sua pasta /tmp, então assim que o computador for reiniciado estas informações serão perdidas e será necessário reinstalar o programa.**


### clipp-api-test

Para facilitar a execução testes no Pyresttest foi criado um shellsript que tem a responsabilidade de:

- rodar testes em lote com possibilidade de filtragem;
- autenticar-se para utilizar serviços que requeiram autorização;
- retornar erro, no caso de problemas, para que outros programas possam notificar a equipe do ocorrido;

Se o teste falhar, ele vai retornar um valor diferente de zero em seu resultado (padrão Unix), o bashscript simplesmente verifica se algum teste retornou algo diferente de zero, caso sim, o próprio programa retorna o valor diferente de zero.

Abaixo está um exemplo da utilização do programa

```
clipp-api-test --url "http://clipp.coderocker.com"
```

Para mais informações rode o comando

```
clipp-api-test --help
```

