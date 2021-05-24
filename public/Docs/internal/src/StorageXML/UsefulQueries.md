#### Comando que gerou o arquivo contagem_milhares_notas_clientes.txt
```sql
with dados as (
    select emissoridentification, count(*) as contagem from storagexml
    group by 1
)
select contagem/1000 as "milhares_notas",
       count(*),
       count(*) filter (where contagem % 1000 between 0 and 249) as "entre 0~249",
       count(*) filter (where contagem % 1000 between 250 and 499) as "entre 250~499",
       count(*) filter (where contagem % 1000 between 500 and 749) as "entre 500~749",
       count(*) filter (where contagem % 1000 between 750 and 999) as "entre 750~999"
from dados group by 1 order by 1;
```
