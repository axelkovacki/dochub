# Notificações

Para que uma notificação seja entregue, é necessário primeiramente adicioná-la a fila "queue".

## Enviando uma mensagem de um módulo para um usuário:

```php
    use Notification\Model\Message;
    use Notification\Model\Peer\User;
    use Notification\Model\Peer\Module;

    $moduleEntity = $this->getEntityManager()->find(\Application\Model\Module::class, 3);
    $userEntity = $this->getEntityManager()->find(\Application\Model\User::class, 5);

    $originPeer = (new Module())->setEntity($moduleEntity);
    $destinationPeer = (new User())->setEntity($userEntity);

    $message = new Message();
    $message->setContent('content of the message');
    $message->setAction('http://optional-link');
    $message->setOrigin($originPeer);
    $message->setDestination($destinationPeer);

    $queue = $this->getService(\Notification\Service\Queue\Database::class);
    $queue->enqueue($message);
```

## Enviando uma mensagem de um usuário para todos os usuários do cliente:
```php
    use Notification\Model\Message;
    use Notification\Model\Peer\User;
    use Notification\Model\Peer\Client;

    $userEntity = $this->getEntityManager()->find(\Application\Model\User::class, 5);
    $clientEntity = $this->getEntityManager()->find(\Application\Model\Client::class, 3);

    $originPeer = (new User())->setEntity($userEntity);
    $destinationPeer = (new Client())->setEntity($clientEntity);

    $message = new Message();
    $message->setContent('content of the message');
    $message->setAction('http://optional-link');
    $message->setOrigin($originPeer);
    $message->setDestination($destinationPeer);

    $queue = $this->getService(\Notification\Service\Queue\Database::class);
    $queue->enqueue($message);
```

## Enviando uma mensagem de um módulo para todos os usuários do sistema:
```php
    use Notification\Model\Message;
    use Notification\Model\Peer\All;
    use Notification\Model\Peer\Module;

    $moduleEntity = $this->getEntityManager()->find(\Application\Model\Module::class, 3);

    $originPeer = (new Module())->setEntity($moduleEntity);

    $message = new Message();
    $message->setContent('content of the message');
    $message->setAction('http://optional-link');
    $message->setOrigin($originPeer);
    $message->setDestination(new All());

    $queue = $this->getService(\Notification\Service\Queue\Database::class);
    $queue->enqueue($message);
```

## Entregando as notificaçôes

Para fazer a entrega *delivery* das notificações aos respectivos usuários existe um script que pode ser chamado no terminal.
```sh
```sh
./compufacil-container console deliveryQueueToDatabase

```

