# Profiling PHP


Para entender os gargalos de performance do PHP o ClippFácil tem
a integração do xdebug.


Para habilitar o profiling é necessário descomentar as seguintes
linhas no php.ini.


```
zend_extension=xdebug.so
xdebug.profiler_enable=0
xdebug.remote_enable=On
xdebug.profiler_enable_trigger=1
xdebug.remote_host=localhost
xdebug.remote_port=9000
xdebug.remote_handler=dbgp
xdebug.profiler_output_dir=/tmp
xdebug.profiler_output_name=cachegrind.out.%p


```

Para habilitar o xdebug para um curl é possível usar os parâmetros

```
--cookie "XDEBUG_PROFILE=XDEBUG_ECLIPSE"

```

Para habilitar o profiler no terminal

```
export XDEBUG_CONFIG="profiler_enable=1"

```


Alternativamente é possível habilitar o profiling para todas as
requests de uma sessão do browser com extensões como o `Xdebug
helper`.


Os arquivos de profile se encontram em

```
/tmp/cachegrind.out.%p

```
