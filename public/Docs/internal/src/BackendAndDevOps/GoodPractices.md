# Boas práticas

## Lógica de negócio exclusivamente na camada de serviços

A única camada do sistema que deve conter lógicas de negócio é a camada de serviços *namespace Service*. Essa estratégia facilita na manutenção do sistema por centralizar a lógica.

Tendo esta regra em mente, lógica em assessores de entidades ou repositórios não são recomendados ou encorajados sendo necessário discutir com a equipe caso a criação de algo do tipo aparente ser necessária.

## Privilegiar composição sobre herança

Evite herança em toda a relação de posse, herança é exclusiva para relações de existência. Em outras palavras, um serviço tem um service manager, não é necessário herdar da classe service para obter este recurso, basta utilizar a interface + trait.

[Teoria](https://en.wikipedia.org/wiki/Composition_over_inheritance)

## Evitar chamadas acíclicas

No exemplo abaixo do post chama ``saveGeneralGoal`` que por sua vez chama ``doPost``. Código escrito dessa forma confunde os leitores e tente a gerar maiores problemas pela necessidade de introduzir *quick fixes* quando o tempo está pressionando.

```sh
    protected function doPost(ParameterSet $params)
    {
        $params->add(new Parameter('type', GoalType::EXPENSE));
        if ($this->isRequestForGeneralGoal($params)) {
            return $this->saveGeneralGoal($params);
        } else {
            $params = $this->extractMonthAndYearFromPeriod($params);
            $this->assertPeriodAndCategoryNotRegistered($params);

            $result = parent::doPost($params);

            if ($params->has('repeat') && $params->get('repeat')->getValue()) {
                $this->generateGoalsForFollowingMonths($params);
            }

            return $result;
        }
    }

    public function saveGeneralGoal(ParameterSet $params)
    {
        $generalGoal = $this->getGeneralGoal();
        if (!$generalGoal) {
            $params->add(new Parameter('description', self::GENERAL_GOAL_DESCRIPTION));
            return parent::doPost($params);
        }

        $params->add(new Parameter('id', $generalGoal['id']));
        $params->add(new Parameter('description', $generalGoal['description']));

        return parent::update($params);
    }
```

## Princípio da responsabilidade única

Serviços devem fazer apenas UMA coisa. Sendo assim funções com nomes incluindo "AND" não são recomendados.

Exemplo:

```sh
function assertPeriodAndCategoryNotRegistered
```

Para mais dicas veja [Clean Code](http://www.slideshare.net/jeancarlomachado/clean-code-51677135/).
