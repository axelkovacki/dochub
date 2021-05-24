# Database

## Database local or remote access and manipulation

#### MySQL

```sh
cpf-dbconn.sh
cpf-dbconn-remote.sh --homolog|--production
```

### Mysql - Tablespace was not found error

- Problem: Mysql docker does not up.

- Solution:
  Delete the main folder in path compufacil/Backend/data/db/main
  give permission to the db folder
  run cpf-docker.


#### PostgreSQL Fiscal

```sh
cpf-dbconn.sh --fiscal
cpf-remote-dbconn.sh --homolog --fiscal
```

#### PostgreSQL Storage

```sh
cpf-dbconn.sh --storage
cpf-remote-dbconn.sh --homolog --storage
```

#### Mirror last production/homolog database backup

```sh
cpf-database-mirror-backup.sh --help
```

#### Mirror production/homolog database

```sh
cpf-mirror-remote-database.sh --help
```

### Execute query by command

Example PostgreSQL
```sh
docker exec {CONTAINER_ID} psql -U fiscal -d compufacil_fiscal -t -A -F"," -c "select * from fiscalnfe;" > /tmp/out.csv
docker exec {CONTAINER_ID} psql -U fiscal -d compufacil_fiscal -c "update fiscalnfe set created where id = 66;"
```

Example MySQL
```sh
docker exec 204ad3439e5d mysql -uclipp -pclipp -e "select * from database.table;" > /tmp/out
```

## Migrations

- The doctrine lib generate the database queries from the entity annotations (`$CLIPP_PATH/Backend/module/src/Model`);
- See the which to database the query will be generate in `Core\EntityManager:class`;
- Before change an entity, check if you update to master branch and your database is updated:
```sh
./compufacil-container cpf-schema
```

#### Generate queries with the entity annotations changes:
```sh
./compufacil-container migrations-diff --help
```

### Applying the new migrations:
```sh
./compufacil-container migrations-migrate --help
```

### Generating a new empty migration:
```sh
./compufacil-container migrations-generate --help
```

## Backups

- Script to backup (will save in a AWS S3 bucket);
- Only run into manager AWS EC2 instance;
```sh
APPLICATION_ENV=homolog cpf-backup
```

- To list the backups of the target day on AWS S3

```sh
aws s3 ls compufacil-backup | grep 2018-01-31

```

- To download the backups

```sh
aws s3 cp s3://compufacil-backup/310120181617-mysql.tar.gz mysql.tar.gz
aws s3 cp s3://compufacil-backup/310120181617-postgres.tar.gz postgres.tar.gz
```