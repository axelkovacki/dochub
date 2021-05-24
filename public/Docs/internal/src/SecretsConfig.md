## Settings to `Secrets`

## Export gpg keys

- To list keys `gpg --list-keys`
- To export public key `gpg --export [pubkey-id] > public.asc`
- To export private key `gpg --export-secret-keys [pubkey-id] > private.asc`

## Import gpg keys

- To import a public key `gpg --import /path/public.asc`
- To import a private key `gpg --import /path/private.asc`
- To list keys `gpg --list-keys`
- To trust key (necessary one time after import) `gpg --edit-key [pubkey-id]`

```
>trust
>5 #choose this option
```
- To init key `cd $CLIPP_PATH/secrets && make init`
- To test keys `cd $CLIPP_PATH && make secrets`

## Renew expiration date GPG key

- List keys `gpg --list-keys`
- Edit old key `gpg --edit-key [key-id]`
- Edit expiration date for keys
```
>expire
>2y
>key 1
>expire
>2y
>list
>save
>trust
>5
```
reference: https://liquidat.wordpress.com/2013/05/07/howto-changing-the-expiry-date-of-gpg-keys/

## Know Problems

#### No secret key found

`gpg: decifragem falhou: Sem chave secreta`

- `gpg --export [pubkey-id] > public.key`
- `gpg --export-secret-key [pubkey-id] > private.key`
- `gpg2 --import public.key`
- `gpg2 --import private.key`
- `rm public.key private.key`
