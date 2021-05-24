# Testes unitários

Para dicas de code review veja [aqui](../Checklist.md).

Deve-se buscar deixar o código sempre um pouco melhor do que ele foi
encontrado. A melhoria pode ser pequena mas é imprescindível que esta
mentalidade de melhora contínua seja adotada. Para mais detalhes
sobre *clean-code* veja [aqui](http://www.jeancarlomachado.com.br/blog/dicasdolivrocleancodederobertc.martin.html).

*O testes devem ser escritos antes da implementação* seguindo as
boas práticas do TDD. TDD não serve apenas para criação de
funcionalidades, mas principalmente para sua manutenção.
É importante que toda a correção de funcionalidade relevante seja
acompanhada por um teste unitário.

## Regras Gerais

- Além dos testes unitários e de integração, deve-se garantir o
  funcionamento através de testes manuais na interface;

- Os testes devem sempre começar com o caminho mais simples da
  implementação (baby-steps).

- As descrições dos testes devem ser claras e objetivas;

- Sempre que for adicionado um teste para corrigir um bug, o teste
  deve falhar caso a correção não esteja presente;

- Nunca implementar a solução do teste dentro do próprio teste ou dentro de um mock;

- Os asserts devem corresponder de 1:1 com o que é esperado no
  enunciado do teste. Devemos sempre cuidar para não manter
  asserts de outros testes ao copiar um teste existente como base;

- Os testes devem sempre cobrir requisitos. E por clareza e
  manutenabilidade é melhor que cada requisito esteja definido em um
  teste separado. É melhor muitos testes pequenos do que um teste
  grande que cubra todas as especificações. Se as partes forem
  provadas, o todo será automaticamente;

- When developing unit tests one should keep in mind performance. A
  good way to improve performance is to use mocks on all related
  dependencies for the given service being tested. Instead of
  passing the real dependency one could use an , a
  Phpunit's mock, an anonymous class or a Mockery mock, rather on this
  order of precedence;

- For the sake of simplicity of testing and to comply with clean
  code rules the better way of entering dependencies on an entity is
  though it's constructor;
  To achieve that is preferably that each service contains it's own
  factory which is responsible to provide it's dependency;

- Procure não escrever código que tenham datas relativas dentro do
    serviço. Os testes com datas relativas são frágeis, tendendo a
    quebrar em partes específicas dos meses. O ideal é
    injetar a data atual no contrutor dos serviços e testar com
   datas fixas.
- Cada teste deve testar apenas um aspecto do sistema. Testes com
    muitos asserts são uma má pratica

---

- Os testes devem ser descritos pela FUNCIONALIDADE e NÃO pelo
  código em si;

Por exemplo:

```sh
    function getProductCollection(params) {
        vm.isLoadingProduct = true;

        return productService.get(params, true)
            .then(function (productCollection) {
                vm.isLoadingProduct = false;
                vm.productCollection = productCollection;
            });
    }


    it('should mark as loading while request is happening', function () {
        vm.isLoadingProduct = false;

        vm.getProductCollection();
        expect(vm.isLoadingProduct).toBe(true);
    });

```

Em nenhum momento no teste acima foi descrito que deveríamos testar se a
variável `isLoadingProduct` tinha que ser setada como true enquanto
a requisição estava ocorrendo. Porém foi descrito no teste que a
função deveria marcar que estava realizando uma requisição.

---


## Especificidades do Backend

Deve existir uma classe de teste para cada serviço. Gateways não
devem ser testados.

Quando algo não esperado acontece prefira usar exception ao invés
do logger diretamente.

Toda a funcionalidade complexa que utiliza serviços já
existentes deve conter ao menos um teste de integração. A
recomendação é que exista uma relação de 9:1 entre testes
unitários e testes de integração;


```
//teste unitário
public function testConsume_shouldCreateOrder()
{
    $mockMessage = MockMessage::validMessageData('transaction.succeeded');
    $message = new Message(json_encode($mockMessage));

    $this->saleService->expects($this->once())->method('post');
    $this->callback->__invoke($message);
}

```

### Helpers de testes

Existe um conjunto de helpers em traits que facilitam na hora da
criação e relacionamento de entidades. Eles se encontram nos
módulos no seguinte padrão de namespace: `ModuleNameTest\Helper\SomeHelper`.

No contexto destes helpers funções que começam com ``add`` criam
alguma entidade no banco de dados, já funções que iniciam com
``build`` apenas inicializam a entidade.


### Convenção de nomenclatura


Os nomes dos testes de backend devem seguir a convenção:
`testNomeDoMetodoTestado_resultadoEsperado_situacaoParaRealizarOResultado`.

**Exemplo:**

`testgetDailyDiagram_shouldReturnZeroedValue_forEachDayWithoutPayment`
`testGetDailyDiagram_assumesDefaultToDate_whenNoneIsProvided`

A situação para realizar o resultado é opcional caso o resultado
esperado seja o default

**Exemplo:**

`testgetDailyDiagram_countSalesByDay`
