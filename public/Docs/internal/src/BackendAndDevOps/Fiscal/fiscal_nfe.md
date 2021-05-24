# Fiscal

## Arquitetura

O fiscal foi desenhado de uma forma idependente do resto do
sistema. Partes que necessitam de dados fiscais, como produto,
apenas repassam os dados das requisições que são delegados a filas
para processar.


### Serie

NF-e serie pode ser de 1 a 99 e modelo 55 para produção, para
homologação a serie é obrigatoriamente 98 e modelo 55

NFC-e serie pode ser de 1 a 98 e modelo 65 para produção, para
homologação a serie é obrigatoriamente 99 e modelo 65

### Status da nota

[Fluxo](https://github.com/compufour/compufacil/wiki/StatusNotaFiscal.png)

## Ferramentas de NFE

[Consulta NFE de produção](http://www.nfe.fazenda.gov.br/portal/consulta.aspx?tipoConsulta=completa)
[Consulta NFE de homologação](http://hom.nfe.fazenda.gov.br/portal/consulta.aspx?tipoConsulta=completa&tipoConteudo=XbSeqxE8pl8=)
[Validação de XML](https://www.sefaz.rs.gov.br/NFE/NFE-VAL.aspx)


## [nfephp](https://github.com/nfephp-org/nfephp/wiki/Certificado-Digital)

- Suporta apenas certificados A1;

- Erros na documentação;

- Para suportar plataformas diferentes é necessário mudar o código
fonte. https://github.com/nfephp-org/nfephp/wiki/Certificado-Digital


Consulta NFE PA: https://app.sefa.pa.gov.br/nfe-consulta-web/validarNota.action

### NFCe

Gerar/Consultar Token SE: http://www.hom.nfe.se.gov.br/portal/portalNoticias.jsp?jsp=barra-menu/servicos/manutencaoCSC.htm
Gerar IE http://4devs.com.br/gerador_de_inscricao_estadual
Consulta NFCE PR http://www.sped.fazenda.pr.gov.br/modules/conteudo/conteudo.php?conteudo=100
Consulta NFCE AM http://sistemas.sefaz.am.gov.br/nfceweb/consultarNFCe.do?acao=submitConsultaNFCe

### Problemas

O CNPJ da Compufour não funciona para emitir NFC-e na ClippFácil,
possivelmente pois a empresa não é de um estado que possa emitir
cupom. Para testar o cupom é necessário utilizar outro CNPJ.

Quando é clonado o ambiente de homolog em desenvolvimento é
necessário trocar o campo próxima nota em configurações. Senão
a geração de nfe/nfce nos dois ambientes vão conflitar e dar o
problema de "duplicidade do documento".

Em alguns ambientes de homologação para geração de NFCE é
necessário utilizar o CSC `0123456789` no lugar do CSC da empresa.


### Manual Nota Fiscal Eletrônica
http://www.nfe.fazenda.gov.br/portal/exibirArquivo.aspx?conteudo=9hd38oni4Nc=
