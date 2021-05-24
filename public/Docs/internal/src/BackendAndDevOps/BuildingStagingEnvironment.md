# Building staging environment

O ambiente 'staging' refere-se a um servidor flexível, onde é possível navegar entre branches, sejam elas de homolog, features específicas ou pré-build¹, por exemplo. Ele se comporta como o ambiente de desenvolvimento, porém, na nuvem. Disponível em http://staging.clippfacil.com.br:8000

¹ Branch que incorpora as funcionalidades que serão lançadas, mas que ainda não está mesclada com a master e requer validações para garantir que erros não serão deployados e enviados para a master.

## Preparando o ambiente de staging ##

1. Garanta em ambiente de desenvolvimento (sua máquina) que a branch que será enviada para staging está estável, não será possível alterá-la a partir do servidor.
2. Envie todas as alterações da branch para o GitHub
3. Para se certificar que a branch está estável você pode rodar o comando abaixo, com a flag target=--local
```sh
cpf-build-staging.sh {branch} --{schema} --local
```

## Disponibilizando a branch no ambiente de staging ##
1. Execute o script abaixo

Caso queira clonar novamente um schema específico
```sh
cpf-build-staging.sh {branch} --{schema} --deploy
```

Caso queira manter o schema e os dados atuais, apenas disponibilizar as alterações:
```sh
cpf-build-staging.sh {branch} --none --deploy
```

## Solução de problemas ##

### Aplicação não está mais rodando após deploy ###
1. Acesse o servidor através do comando
```sh
cpf-ssh.sh --staging
```

2. Verifique se os containeres estão de pé:
```sh
cd compufacil && docker-compose ps
```

3. Caso não estejam, você pode tentar o setup do abiente novamente, através do comando
```sh
```