```
npx prisma migrate dev --name init
npx prisma db pull

```

# DOCUMENTACIÓN

El servidor corre en el puerto 5000 localmente.
Nuestra URL de desarrollo es: http://localhost:5000

# AUTENTICACIÓN
## Registro de usuarios
El endpoint para realizar el registro de usuarios:
http://localhost:5000/api/auth/register
El token es generado con base en el identificador del usuario y el correo.
## REQUEST
Enviar la siguiente información para poder registrar a un usuario correctamente. 
En role existen dos opciones ['USER_ROLE', 'ENTERPRISE_ROLE'].
Todos los campos son validados en el backend.
```
{
    "email":"correo@gmail.com",
    "password":"Serge+1202",
    "role":"USER_ROLE"
}

```

### RESPONSE
* Una vez realizado el registro correctamente ya no es necesario realizar el login, pues automáticamente se genera
un token de acceso con una duración de 2 horas para poder acceder a la aplicación.  El token generado después de realizar el registro o el inicio de sesión es validado en el backend para cada una de las operaciones que se llevarán acabo en la aplicación.

* Después de realizar el registro se le enviará al usuario por medio de un correo electrónico un link para validar su correo electrónico. ANTES DE CREAR PERFILES DEBERÍA DE HABER VALIDADO EL CORREO ELECTRÓNICO. De no ser así agreguen algun boton para reenviar el correo electrónico con el link de verificación de email.

```
  {
    "account": {
        "id": 4,
        "email": "serge15games@gmail.com",
        "role": "USER_ROLE",
        "email_validated": false,
        "createdAt": "2025-01-02T00:12:35.275Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjo0LCJpYXQiOjE3MzU3NzY3NT"
  }
```
### RESPONSE ERRORES
El endpoint devolverá error si alguno de los campos de registro está mal, por ejemplo si el correo no es valido 
o que la contraseña no cumpla con los requerimientos nece3sarios.

## INICIO DE SESIÓN DE LOS USUARIOS
El endpoint para realizar el inicio de sesión de los usuarios: http://localhost:5000/api/auth/login

## REQUEST 
Enviar la siguiente información para poder iniciar sesión.

{
    "email":"serge15games@gmail.com",
    "password":"Serge+1202"
}

## RESPONSE
En la respuesta obtenemos la misma que al registrar a un usuario. El token de acceso 
para todas las operaciones dentro de la aplicación.


```
  {
    "account": {
        "id": 4,
        "email": "serge15games@gmail.com",
        "role": "USER_ROLE",
        "email_validated": false,
        "createdAt": "2025-01-02T00:12:35.275Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjo0LCJpYXQiOjE3MzU3NzY3NT"
  }
```

## SOLICITUD PARA EL REESTABLECIMIENTO DE LA CONTRASEÑA

Primero deberían de pedir el **CORREO ELECTRÓNICO** del usuario, una vez ingresado deberían de llamar el siguiente endpoint para enviar un correo electrónico al usuario con el link para reestablecer su contraseña. 

```
  TIPO: POST
  AUTHORIZATION: NONE
  ENDPOINT: http://localhost:5000/api/auth/forgot-password
```

La vista para reestablecer la contraseña no es necesaria realizarla, pensaba que podría ser servida por el mismo servidor así le implementamos más seguridad a la app.

## REQUEST
En el cuerpo de la request enviarán solo el correo electrónico.

```
  {
    "email": "serge15games@gmail.com"
  }
```

## RESPONSE
Si todo sale bien, el servidor responderá con el siguiente mensaje:

```
  {
    "message": "Se ha enviado un correo electrónico a serge15games@gmail.com"
  }
```

Se enviará un correo electrónico al usuario donde se le proporcionará el link para reeestablecer la contraseña,
donde en la misma se proporciona un token de acceso generado con una duración de 15 MINUTOS.

## ERRORES
```
  Error: 400
  Message: Correo no válido

  Error: 400
  Message: No se proporcionó el correo electrónico.

  Error: 400
  Message: El correo no está registrado.

  Error: 500
  Message: Internal Server Error
```



