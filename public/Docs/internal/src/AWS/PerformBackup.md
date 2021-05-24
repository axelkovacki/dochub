#### The backup example is the most common, but change what you need

**SHUT OFF SERVER AFTER COMPLETING BACKUP**
**To setup a backup server see $CLIPP_PATH/Docs/internal/src/AWS/CreateABackupServer.md**

#### Doing a flow backup:
For better presentation the commands will be represented by variables:

- `$flowAssociation = 'select id from FinanceFlow where client_id = CLIENT_ID'`
- `$baseMysqlDump = 'mysqldump -u root -proot clipp --lock-all-tables --no_create_info --tables'`

```sh
docker exec -it "MYSQL_CONTAINER_ID" bash -c "$baseMysqlDump FinanceFlow --where='client_id = CLIENT_ID'" > /tmp/FinanceFlow.sql
docker exec -it "MYSQL_CONTAINER_ID" bash -c "$baseMysqlDump FinanceFlowGroup --where='FinanceFlowGroup.client_id = CLIENT_ID'" > /tmp/FinanceFlowGroup.sql

docker exec -it "MYSQL_CONTAINER_ID" bash -c "$baseMysqlDump FinanceExpense --where='FinanceExpense.id in ($flowAssociation)'" > /tmp/FinanceExpense.sql
docker exec -it "MYSQL_CONTAINER_ID" bash -c "$baseMysqlDump FinanceRevenue --where='FinanceRevenue.id in ($flowAssociation)'" > /tmp/FinanceRevenue.sql
docker exec -it "MYSQL_CONTAINER_ID" bash -c "$baseMysqlDump FinanceTransfer --where='FinanceTransfer.id in ($flowAssociation)'" > /tmp/FinanceTransfer.sql
```
Get the modified files from backup server
```sh
cpf-get-from-remote.sh ${serverIP} /tmp/FinanceFlow.sql /tmp/
cpf-get-from-remote.sh ${serverIP} /tmp/FinanceExpense.sql /tmp/
cpf-get-from-remote.sh ${serverIP} /tmp/FinanceRevenue.sql /tmp/
cpf-get-from-remote.sh ${serverIP} /tmp/FinanceTransfer.sql /tmp/
cpf-get-from-remote.sh ${serverIP} /tmp/FinanceFlowGroup.sql /tmp/

atom /tmp/Finance*.sql || subl /tmp/Finance*.sql || gedit /tmp/Finance*.sql
```

**Change mysqldump file, remove other things and change 'INSERT INTO' to 'INSERT IGNORE INTO' to ignore duplicate values. After that copy and paste on database**
