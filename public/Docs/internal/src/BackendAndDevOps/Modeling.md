# Preocupações ao criar modelos

Entidades de cliente devem ser removidas junto com o cliente.
Então é importante setar o CASCADE.

Colunas de enum é preferível usar strings ao invés de números.

É importante sempre ter uma coluna de identificador para não
precisar comparar a string que o usuário vê.

```php
class PaymentType
{
    const MONEY = 'money';
    const DEBIT_CARD = 'debitCard';
}



//on the relation table:
type |  name
'money' | 'Dinheiro'
'debitCard' | 'Cartão de Débito'


//on the service

if ($flow->getType() == PaymentType::MONEY) {
    //do something
}

```

Em entidades que tem uma entrada padrão no sistema. Se esse valor
padrão não puder ser editado. É preferível usar o controle dentro
do software do que criar uma coluna exitra "default" dentro do
banco de dados. Como regra geral, se o controle pode ficar no
software ele deve ficar lá.

Enums e listas de coisas que não é do cliente é preferível usar arquivos.
Nem tudo deve ir no banco de dados. As vezes apenas configurações
de arquivos são uma alternativa mais elegante e performática.

Todas as novas entidades devem usar a coluna uuid.

É importante criar caches de [second layer](http://docs.doctrine-project.org/projects/doctrine-orm/en/latest/reference/second-level-cache.html) para as entidades consultadas frequentemente.

Não usar assessores para relações do doctrine. Usar atributos
públicos ao invés disso.

Lembrar de criar índices em colunas mais acessadas, nas entidades
mais importantes.
