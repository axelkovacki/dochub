# Comandos úteis

Podem ser executados via Slack (channel `#cli-commands`)
```sh
/cpf-prod - Para Produção
/cpf-hmg  - Para Homologação
```

#### Listar os Planos Existentes no CompuFácil
```sh
/cpf-prod plans
```

#### Mudar o Plano do Cliente
```sh
/cpf-prod subscription --change-plan id_Plano email@email.com
```

#### Remover Cliente
```sh
/cpf-prod client-remove email@email.com --skip-confirmation
```

#### Cancelar assinatura do Cliente
```sh
/cpf-prod subscription --cancel email@email.com
```

#### Conferir Cliente cadastrado
```sh
/cpf-prod client-info email@email.com
/cpf-prod client-info id_cliente (pesquisa via ID)
/cpf-prod query "SELECT EMAIL from ApplicationClient WHERE identification=cnpjDoCliente"
```

#### Criar Cliente no Asaas
```sh
/cpf-prod asaas-create-client email@email.com
```

#### Dar + dias de acesso ao Cliente
```sh
/cpf-prod subscription -cd "+10 days" email@email.com
```

#### Mudar o status de pagamento do cliente (3 é quando esta block)
```sh
/cpf-prod subscription --set-status 1 email@email.com
```

#### Mudar o status de pagamento e dizer que foi pago
```sh
/cpf-prod payment --set-status 10 paymentId
```

#### Mudar o status de uma NF-e
```sh
/cpf-prod nfe-status --authorized id_da_NFe
/cpf-prod nfe-status --help #caso necessario ajuda no comando
```

#### Conferir o status de uma NF-e
```sh
/cpf-prod nfe-info id_da_NF

```
#### Atribuir ORIGEM para todos os produtos de um Cliente
```sh
/cpf-prod apply-origem-to-all-client-products email@email.com Nº ORIGEM
```

#### Atribuir CSOSN para todos os produtos de um Cliente
```sh
/cpf-prod apply-csosn-to-all-client-products email@email.com NºCSOSN
```

#### Atribuir CST para todos os produtos de um Cliente
```sh
/cpf-prod apply-cst-to-all-client-products email@email.com NºCST
```

#### Identificar o status de pagamento do próximo dia
```sh
/cpf-prod subscription-next-status email@email.com
```

#### Tornar Parceiro
```sh
/cpf-prod turn-into-reseller email@email.com 1040
https://clippfacil.com.br/?parceiro=1040
```

#### Atribuir Cliente ao Parceiro
```sh
/cpf-prod relate-client-to-reseller emailCliente@email.com emailParceiro@email.com
```

#### Gerar números de série para o parceiro
```sh
/cpf-prod generate-serial-codes email@email.com 10
```

#### Gerar número de série para o parceiro atribuido um plano
```sh
/cpf-prod generate-serial-codes email@email.com 1 id_plan
```

#### Atribuir serial e plano do serial a um Cliente
```sh
/cpf-prod assign-serial-to-client email@email.com SERIAL
```

#### Remover serial
```sh
/cpf-prod remove-serial SERIAL
```

#### Listar clientes de um parceiro
```sh
/cpf-prod query "SELECT c.email FROM ResellerSerial rs INNER JOIN ApplicationClient c ON c.id = rs.client_id WHERE rs.reseller_id = (SELECT id FROM ApplicationClient WHERE shareableCode = '1040');"
```

#### Descobrir o parceiro do cliente
```sh
/cpf-prod query "SELECT c.name, c.email FROM ResellerSerial s INNER JOIN ApplicationClient c ON c.id = s.reseller_id WHERE s.client_id = 666;"
```

#### Mandar mensagem para usuário
```sh
/cpf-prod notify email@email.com "olá mundo"
```

#### Listar a relação de clientes de um plano
```sh
/cpf-prod query "SELECT email FROM ApplicationClient as ac INNER JOIN ApplicationSubscription as asub ON ac.id = asub.client_id INNER JOIN ApplicationPaymentMode as ap ON asub.paymentMode_id = ap.id WHERE ap.id=1;"
```

#### Mudar o plano do cliente
```sh
./compufacil-container subscription --change-plan PlanId email@email.com
```

#### Atualizar pagamentos de um cliente
```sh
/cpf-prod asaas-sync-payments-client email@email.com
```

#### Atualizar payment identifier de um cliente
```sh
/cpf-prod change-client-asaas-identifier email@email.com 2624352
```

#### Ativar a movimentação de estoque para um usuário específico
Para desativar a movimentação incluir o parâmetro opcional --disable ao comando
```sh
/cpf-prod client-enable-inventory-movimentation userId|email@email.com
```

#### Consultar cliente registrados por data
```sh
/cpf-prod query "SELECT id, email, name, created FROM ApplicationClient WHERE created > '2019-03-13' AND created < '2019-03-14';"
```

#### Consultar clientes por UF/região
```sh
/cpf-prod get-client-data
```

#### Consultar telefone dos clientes registados na data
```sh
/cpf-prod query "SELECT p.areaCode, p.number, c.name, c.email FROM ApplicationPhone p LEFT JOIN ApplicationClient c ON c.id = p.client_id WHERE p.client_id IN (SELECT id FROM ApplicationClient WHERE created > '2019-03-15') GROUP BY p.client_id;"
```

#### Resetar/editar assinatura da configuração do SAT
```sh
# Resetando
/cpf-prod update-sat-signature email@mail.com ''
# Editando
/cpf-prod update-sat-signature email@mail.com 'Assinatura texto'
```

Para ver seriais de uma revenda **sem** clientes vinculados:
```sh
/cpf-hmg query "SELECT s.code as oldCode, s.c4NewCode FROM ResellerSerial s WHERE s.client_id IS NULL AND s.c4NewCode IS NOT NULL AND s.reseller_id = ID_RESELLER;"
```

Para ver seriais de uma revenda **com** clientes já vinculados:
```sh
/cpf-hmg query "SELECT s.code as oldCode, s.c4NewCode, c.email as client FROM ResellerSerial s LEFT JOIN ApplicationClient c ON s.client_id = c.id WHERE s.client_id IS NOT NULL AND s.c4NewCode IS NOT NULL AND s.reseller_id = ID_RESELLER;"
```
