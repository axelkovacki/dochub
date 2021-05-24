# Deploy

### Informações Importantes ⚠️⚠️⚠️
1. **Deploys de produção são geralmente feitos fora de horários de pico (início da manhã ou ao meio dia).**
2. **O deploy desloga todos os usuários ativos.**
3. **Não fazer deploys de produção que não estejam revisados pelos testers.**

---

## Deploy de **Homologação**

1. Acessar branch develop e atualizá-la com a origin:
```
    git checkout develop && git pull origin develop
```

2. Reiniciar todos os container executando:
```
    cpf-docker
```

3. Certificar-se que todos os containers estão de pé:
```
    docker-compose ps
```

4. Rodar na pasta raiz do projeto*:
```
    make deployHomolog
```

* Caso exista alguma atualização no arquivo `cannon.yml` ou qualquer outra atualização na imagem que deva ser enviada, rodar o comando com a tag `UPDATE-CANNON=TRUE`, da seguinte forma:
```
    make deployHomolog UPDATE-CANNON=TRUE
```

---

## Deploy de **Produção**

1. Acessar branch master e atualizá-la com a origin:
```
    git checkout master && git pull
```

2. Abrir uma branch chamada deploy a partir da master:
```
    git checkout -b deploy master
```

3. Clonar o banco clean:
```
    cpf-clone-remote-database.py --clean
```

4. Selecionar os commits que irão para deploy através do cherry-pick (para detalhes, ver seção [Selecionando os commits que irão para deploy](#Selecionando-os-commits-que-irão-para-deploy)):
```
    git cherry-pick <hash commit>
```

5. Corrigir possíveis conflitos e reiniciar todos os containers:
```
    cpf-docker
```

6. Após selecionar todos os commits, certificar-se que todos os containers estão de pé:
```
    docker-compose ps
```

7. Fazer Push da branch local:
```
    git push origin deploy
```

8. Abrir um Pull Request da branch **deploy apontando para master** contendo na descrição uma listagem de todas as tasks que serão enviadas. [Modelo de Pull Request](https://github.com/compufour/compufacil/pull/13067).

9. **Após review**, iniciar o deploy a partir da raiz do projeto*.
```
    make deployProduction
```

* Caso exista alguma atualização no arquivo `cannon.yml` ou qualquer outra atualização na imagem que deva ser enviada, rodar o comando com a tag `UPDATE-CANNON=TRUE`, da seguinte forma:
```
    make deployProduction UPDATE-CANNON=TRUE
```

10. Após concluir o build, acessar servidor de produção:
```
    cpf-ssh.sh --production
``` 

11. Certificar-se que todas as réplicas estão de pé:
```
    docker service ls
```

12. Acessar [link de produção](https://clippfacil.com.br) e **verificar a consistência** da aplicação.

13. Após validação, finalizar o Pull Request no GitHub com um **rebase** para master.

14. Estando na branch deploy local, executar comando de criação de tag **(substituindo 'x' pelo número adequado)**:
```
    git tag -a v1.0.x -m "Deploy v 1.0.x - dd/mm/yyyy
```

15. Enviar a nova tag para o repositório remoto com:
```
    git push origin v1.0.x
```

16. Remover a branch local:
```
    git branch -D deploy
```

17. Publicar a tag como release no [GitHub](https://github.com/compufour/compufacil/releases):
    * Editar a tag enviada;
    * Insirir na descrição todas as tasks que foram para deploys igualmente como no Pull Request.
    * Publicar a tag como um release.

---

## Selecionando os commits que irão para deploy 

As issues a serem enviadas para deploy devem estar na coluna **Ready to build** do [board do projeto](https://github.com/compufour/compufacil/projects/4) e não arquivadas. Normalmente os commits que devem ir para deploy estarão na branch develop. É possível obter detalhes sobre as issues e commits a serem enviados, executando o comando abaixo. Isso evita a necessidade de identificar os commits de forma manual:
```
    cpf-get-issues-to-deploy.sh
```

### Entendendo o output

#### Diferenças entre commits em develop e merge commits
Após o log para acompanhamento das requests, a lista de issues e respectivos commits, por exemplo:
```
Issue #13894: 
Array
(
    [developCommits] => Array
        (
            [0] => 60cf351ec305322839395351feacb236d0b21a4e
            [1] => 49a9e36450c077b1c7ef68ce89177a9f38bf94a2
        )

    [mergeCommits] => Array
        (
            [0] => 60cf351ec305322839395351feacb236d0b21a4e
            [1] => 49a9e36450c077b1c7ef68ce89177a9f38bf94a2
        )

)
```

Onde:
* `#13894` é o número da issue. Ex: https://github.com/compufour/compufacil/issues/13964
* `[developCommits]` contém a lista de hashes dos commits cuja mensagem corresponde ao padrão "`<numero-da-issue> - <mensagem>`". Exemplo: "`13894 - mensagem do commit`"
* `[mergeCommits]` contém a lista de hashes dos merge commits gerados nas PRs com status `merged` conectadas à issue.

Em um cenário perfeito, os mesmos commits apresentados na chave `developCommits` devem estar em `mergeCommits`. Caso contrário, o cabeçalho relativo à issue com problema será exibido como abaixo, e deve ser verificado se é de fato um problema e tomada devida ação:

```
Issue #13832: Warning! There is a difference between development commits and related PRs merge commits.
```

##### Problemas comuns
Abaixo estão alguns problemas comuns que levam a apresentação da mensagem acima. Podem existir outras causas.

1. O commit é apresentado apenas em `developCommits`
* A issue pode estar incorretamente referenciada no PR de origem do commit; ou:
* O PR pode não corresponder à issue em si, apenas a referencia por algum motivo.

2. O commit é apresentado apenas em `mergeCommits`
* A mensagem do merge commit relativo ao PR pode estar fora do padrão; ou:
* O commit pode ter sido em outra branch diferente da develop

#### Lista de commits
Logo após a lista de issues/commits, é exibida a lista de commits, sendo os mais antigos exibidos primeiro, separados por ponto e vírgula (;), no formato "`<data do merge>;<numero da issue>;<hash do commit>`". Exemplo:
```
Sorted commits OLDER FIRST (separated by semicolon):
2021-03-11T11:27:38Z;12150;be1b7fed94c95c7c14200fa4e97078c6b2f897d2
2021-05-11T12:12:20Z;13533;b1a93e76a663cdab4fe61efb9412ca6404371bce
2021-05-11T19:32:29Z;13533;b8cb0bb42fbc1a3a2d271e786870af06a8b8254b
2021-05-12T18:19:27Z;13894;60cf351ec305322839395351feacb236d0b21a4e
2021-05-13T13:34:53Z;12150;c825edb7ec25ab53c053dced05eca38e427455f4
2021-05-14T12:58:32Z;13832;57fee3584de821acd043b13b7a6ddb0c56e3cf28
```

Esse formato facilia a importação para aplicativos de planilha bem como a separação em arquivos de texto a fim de controlar os commits que já foram *picked*. Obs: sinta-se livre para controlar os commits da forma como preferir.


## Resolução de problemas:

### Rotas ou parâmetros não encontrados durante a consulta do Backend.
1. Remover o container do memcached:
```
    docker service rm production_memcached
```

2. Subir o container novamente executando script de deploy de ambiente de produção:
```
    docker stack deploy --compose-file /tmp/docker-compose-production.yml production --with-registry-auth
```

### Problemas com filas.
1. Remover os containers do rabbitmq e cannon:
```
    docker service rm production_rabbitmq production_cannon 
```

2. Subir o container novamente executando script de deploy de ambiente de produção:
```
    docker stack deploy --compose-file /tmp/docker-compose-production.yml production --with-registry-auth
```


## Observações importantes:
1. Os mesmos passos referente ao `docker stack deploy` podem ser executados no ambiente de homologação. Para isso, basta subistituir `production` por `homolog`.

2. Caso o compose-file não seje encontrado em ambiente de produção ou homologação, será necessário subi-lo de sua máquina local. Para isso, rodar:
```
    cpf-send-to-remote.sh --<instance> /path/local/file /tmp/remote-file
```

3. Para reiniciar containers sem executar o `docker stack deploy`, pode ser utilizado os seguintes comandos:
```
    docker service scale <container name> = 0
```

```
    docker service scale <container name> = x
```

4. Remover o memcached ou executar o `docker stack deploy` **faz com que todos os usuários sejam deslogados**.

---

## Dúvidas?

**Caso não saiba se deve abrir uma feature ou hotfix, tire sua dúvida pelo canal #development do slack**
