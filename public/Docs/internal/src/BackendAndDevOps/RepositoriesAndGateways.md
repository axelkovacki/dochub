# Boas práticas na criação de métodos em Repositories e Gateways

Classes Repository ou Gateways são responsáveis por retornar objetos e podem gerar erros caso retornem algo que não seja esperado.
Isso ocorre quando a classe não encontra o objeto requerido, retornando `null` ou uma collection vazia.
para evitar erros e inúmeros `ifs` desnecessários vamos criar um padrão para essas classes!

## Metodos get
Métodos `getAlgumaCoisa()` devem retornar o objeto requerido *ou* lançar uma exceção que represente o problema e possa gerar uma mensagem de erro para o usuário.
ex:
```php
    public function getProductById($id)
    {
        $product = $this->repository->findOneBy([
            'id' => (int) $id
        ]);

        if (empty($product)) {
            throw new NotFoundException(sprintf('The Product with the id "%d" does not exist.', $id));
        }

        return $product;
    }
```
Sendo assim, o código que utiliza esse método não precisa se preocupar e fazer validações

## Métodos find
Métodos `findAlgumaCoisa` devem retornar o objeto requerido ou `null`, esses métodos são utilizados em casos que o objeto não é necessário a operação e o programador saberá e irá tratar o caso em que o objeto não exista.
ex:
```php
    public function findProductByName($name)
    {
        $product = $this->repository->findOneBy([
            'name' => $name
        ]);

        return $product;
    }
```

## Métodos que retornam Collections
Esses métodos geralmente não geram problemas no código pelo fato de serem iterados e ao retornar uma collection vazia acabam pulando o fluxo que interage com os objetos da collection.
Nesses casos o ideal é retornar o resultado do ORM :)
ex:
```php
    public function findClientsByUserId($userId)
    {
        $clients = $this->repository->findBy([
            'userId' => $userId
        ]);

        return $clients;
    }
```
