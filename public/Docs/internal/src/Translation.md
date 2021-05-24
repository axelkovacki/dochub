# Sistema de traduções


## Traduzindo no backend

Pode-se traduzir textos de serviços com a seguinte chamada:

`` _('Text to be translated'); ``


## Gerar locales

```
locale-gen pt_BR.utf8 && locale-gen en_US.utf8
```

## Utilitários


Para gerar os MOs:
```
cpf-i18n-mo-compile

```

Para mapear as strings faltantes:

```
cpf-i18n-update-po-files

```


## Quando não traduzir

É desencorajado que se traduza mensagens de erro de aplicação -
aquelas mensagens que ocorrem somente quando o sistema não está
operando como deveria. Nesses casos o que se espera é que o ajuste
necessário seja feito o mais rápido o possível de modo que este
tipo de erro nunca seja visível aos usuários finais.

## Utilizando serviços já traduzidos

A fim de obter o resultado de qualquer serviço com mensagens já
traduzidas faz-se necessário passar o header ``Accept-Language`` com o
nome do locale em seu conteúdo.

Por exemplo, ao tentar criar um usuário já existente em post-user-client,  o resultado será:

```

{
error_code: 1
error_message: "Duplicate entry"
}

```
Ao passar o header  ``Accept-Language: pt_BR``, o resultado será:

```

{
error_code: 1
error_message: "Entrada duplicada"
}

```

## Idioma do usuário

O idioma do usuário é retornado no processo de login e deve ser
utilizado em todas as requisições posteriores à serviços que
necessitem internacionalização.

