# Errors

Api errors generally are disposed in the following pattern:

```
{
    "error_code": 0,
    "error_message": "teste"
}
```

## Validation Errors

Validation erros are those in which represents the incorrect usage of the api.
Their purpose if or developers debug, not for user consumption.

```
{
    "error_code": 0,
    "error_message": "Value is required and can't be empty"
    "error_fields": {
        "fiscal": {
            "produto": {
                "origem": {
                    "isEmpty": "Value is required and can't be empty"
                },
                "NCM": {
                    "isEmpty": "Value is required and can't be empty"
                }
            }
        }
    }
}
```
