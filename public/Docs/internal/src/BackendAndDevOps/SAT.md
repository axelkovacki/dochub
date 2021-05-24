# Integração Compufácil com o SAT (Sistema Autenticador Transmissor)

Pegar primeiro item na fila
```
curl -X POST 'http://app.clippfacil.local/rpc/v1/fiscal.sat-first-item-on-queue' -H 'Content-Type: application/json' -H 'Accept: application/json, text/plain, */*' -H 'Authorization-Compufacil: {AUTHENTICATED_USER_TOKEN}' -H 'sat-authorization: s2rbCs5kcWoG7X1ql32GfqU6dgIkWoni' --data-binary '{}' --compressed
```

Resposta com falha
```
curl -X POST 'http://app.clippfacil.local/rpc/v1/fiscal.send-sat-xml-response' -H "sat-authorization:s2rbCs5kcWoG7X1ql32GfqU6dgIkWoni" -H "Authorization-Compufacil:{AUTHENTICATED_USER_TOKEN}" -H "Content-Type:application/json" -d '{"satId":111,"error":"FALHA:Rejeicao"}'
```

Resposta com sucesso
```
curl -X POST 'http://app.clippfacil.local/rpc/v1/fiscal.send-sat-xml-response' -H "sat-authorization:s2rbCs5kcWoG7X1ql32GfqU6dgIkWoni" -H "Authorization-Compufacil:{AUTHENTICATED_USER_TOKEN}" -H "Content-Type:application/json" -d '{"satId":111,"file":"<XMLCONTENT></XMLCONTENT>"}'
```

#### **Informações Adicionais**
Exemplo de XML SAT: `Backend/module/Clipp/tests/src/ClippTest/Mock/sat.xml`
