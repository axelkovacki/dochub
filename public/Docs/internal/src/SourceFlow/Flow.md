# Fluxo
---
## Fluxo

Temos dois ramos principais, `master` e `develop`.
Develop deve ser mantido atualizado em relação a master e é dele que novas funcionalidades partem.
Master é o estado atual do sistema em produção, **sempre estável**.
Develop só deve ser convergido para master quando estiver **estável**.


## Ramo principal (master)

O Ramo principal `master` representa o sistema em produção. Correções rápidas continuarão sendo apontadas para ele, como a alteração de url de um webservice.

## Ramo develop

O ramo `develop` é utilizado para criar novas funcionalidades.
Não fazemos commits diretamente neste ramo, abrimos uma branch a partir dele e enviamos nossas alterações por meio de uma pull request para review de nossos colegas.


## Iniciando uma tarefa

Para iniciar uma hotfix, utilizar o comando
```sh
git checkout -b {numero da issue} master
```

Para iniciar uma feature, utilizar:
```sh
git checkout -b {numero da issue} develop
```

## Abrindo uma Pull Request

Abra a PR normalmente, seja pela interface do github ou pela [linha de comando](https://github.com/cli/cli).


## Cuidados necessários

* Não deixar o ramo de develop muito inflado, realizando deploys continuamente.
* Caso seja necessário deixar uma feature ou um conjunto de features em paralelo, criar um ramo principal para a feature e apontas as demais para esse ramo.
* Mantenha o ramo de develop atualizado com uma Pull Request aberta, fazendo merge de master ou develop para ele constantemente.


## Exemplos Hotfix:

* Um relatório está apresentando uma inconsistência em produção e precisamos alterar o código fonte;
* O URL de um webservice mudou e precisamos arrumar imediatamente;
* O e-Commerce precisa de uma alteração imediata na integração no ambiente de produção;

## Exemplos de Features:

* Adicionar um novo campo no cadastro do usuário;
* Integrar o iFood ao sistema;
* Criar um novo relatório;

## Dúvidas?

**Caso não saiba se deve abrir uma feature ou hotfix, tire sua dúvida pelo canal #development do slack**
