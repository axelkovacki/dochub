# Exceptions

## Regras Gerais

Existe um conjunto de exceções pré-definidas que devem ser utilizadas em detrimento da criação de outras ou da utilização da classe base ``\Exception``.

Caso não exista uma exceção pré-definida para um caso recorrente deve-se criar uma nova exceção e documentá-la neste arquivo. As execeções que não são específicas de um domínio devem ficar no namespace Core.

As exceções devem estar no namespace do contexto do erro.  Por exemplo: ``NoIdentityException`` encontra-se dentro do namespace ``Auth``.

As exceções não tratadas nos serviços vão gerar um erro ``500`` como resultado HTTP a não ser que outro erro seja especificado.

### Especificando o código do erro HTTP da exceção

Caso a exceção esteja em acordo com algum código HTTP o código HTTP deve ser retornado ao invés do padrão ``500``.

Para definir um código HTTP em uma exceção basta setar a variável code dentro da classe da exceção; exemplo:

```php
<?php
namespace Core\Auth;

use Exception;

/**
 * @category Core
 * @package  Exception
 */
class NoIdentityException extends Exception
{
    protected $code = 401;
    protected $message = 'No user found for the given token';
}
```

## Exceções Existentes

Abaixo segue a lista das exceções atualmente disponíveis:

``Core\Acl\DeniedAccessException``

Para casos onde exista a demanda por uma permissão não suprida

``Core\Acl\NoAdminException``

Para casos onde a permissão de administrador é necessária mas não está disponível

``Core\Auth\NoIdentityException``

Para casos onde não exista alguém autenticado mas contornável com a autenticação

``Core\Auth\NoTokenException``

Lançado quando o token de autenticação é requerido mas o mesmo não foi informado

``Core\Exception\RequiredByRelationException``

Utilizado quando o usuário solicita ao sitema a exclusão de uma entidade, porém a mesma possui relacionamento(s) que não pode(m) ser removido(s), logo a exclusão não é realizada e a Exception é lançada pela aplicação.

``Core\Service\InvalidParameterException``

Utilizado quando algum parâmetro requerido por um serviço não corresponde ao esperado

``Core\Service\MissingParameterException``

Utilizado quando algum parâmetro requerido por um serviço não foi informado

``Core\Model\EntityNotFoundException``

Utilizado quando uma entidade não foi encontrada

``Core\Serice\DuplicateEntryExeption``

Utilizado quando já existe uma entidade semelhante cadastrada

## Lista de status code

 - 422 Validação
 - 500 Fatal error
