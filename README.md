# op_registrator

### Instalacion

ojo: nesesitamos tener installado y configurado mongodb

##### clonamos el repositorio:

git clone git@github.com:suchilin/op_registrator.git

cd op_registrator

cd backend

npm install

node bin/www

##### en otra pestaña de la consola:

cd op_registrator

cd frontend

npm install

npm start

con esto se nos abrira una ventana del navegador, si no se abre podemos ver la app en http://localhost:3000

primero registramos un usuario, y con el mismo nos logeamos

### Para logearse con curl:

con el usuario creado:

ejemplo

curl -d "username=jesus&password=supersecret" -X POST http://localhost:8000/api/signin

### esto regresara el token en un formato paresido a esto:

{"success":true,"token":"JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwic2VsZWN0ZWQiOnt9LCJnZXR0ZXJzIjp7fSwiX2lkIjoiNWI2YThkYjViZWQ1OGQ2MzlmNmU1MDU2Iiwid2FzUG9wdWxhdGVkIjpmYWxzZSwiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsicGFzc3dvcmQiOiJpbml0IiwidXNlcm5hbWUiOiJpbml0IiwiX192IjoiaW5pdCIsIl9pZCI6ImluaXQifSwic3RhdGVzIjp7Imlnbm9yZSI6e30sImRlZmF1bHQiOnt9LCJpbml0Ijp7Il9fdiI6dHJ1ZSwicGFzc3dvcmQiOnRydWUsInVzZXJuYW1lIjp0cnVlLCJfaWQiOnRydWV9LCJtb2RpZnkiOnt9LCJyZXF1aXJlIjp7fX0sInN0YXRlTmFtZXMiOlsicmVxdWlyZSIsIm1vZGlmeSIsImluaXQiLCJkZWZhdWx0IiwiaWdub3JlIl19LCJwYXRoc1RvU2NvcGVzIjp7fSwiZW1pdHRlciI6eyJfZXZlbnRzIjp7fSwiX2V2ZW50c0NvdW50IjowLCJfbWF4TGlzdGVuZXJzIjowfSwiJG9wdGlvbnMiOnRydWV9LCJpc05ldyI6ZmFsc2UsIl9kb2MiOnsiX192IjowLCJwYXNzd29yZCI6IiQyYSQxMCRnSjcwTUo2ejAwLkd4Vy52eGoueTB1dFJpU2VaZFdReENpOS94VHF5ZFhwblpLOW85S2pqeSIsInVzZXJuYW1lIjoiamVzdXMiLCJfaWQiOiI1YjZhOGRiNWJlZDU4ZDYzOWY2ZTUwNTYifSwiJGluaXQiOnRydWUsImlhdCI6MTUzMzc5MDIyNX0.if93hREIDf4gDxBdZCMafAyaneH-K9R1PQuk0Jsurx4"}
### la parte que nos interesa es el token, lo copiamos para realizar las consultas a los endpoints

### ejemplo:

curl -H "Authorization: JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwic2VsZWN0ZWQiOnt9LCJnZXR0ZXJzIjp7fSwiX2lkIjoiNWI2YThkYjViZWQ1OGQ2MzlmNmU1MDU2Iiwid2FzUG9wdWxhdGVkIjpmYWxzZSwiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsicGFzc3dvcmQiOiJpbml0IiwidXNlcm5hbWUiOiJpbml0IiwiX192IjoiaW5pdCIsIl9pZCI6ImluaXQifSwic3RhdGVzIjp7Imlnbm9yZSI6e30sImRlZmF1bHQiOnt9LCJpbml0Ijp7Il9fdiI6dHJ1ZSwicGFzc3dvcmQiOnRydWUsInVzZXJuYW1lIjp0cnVlLCJfaWQiOnRydWV9LCJtb2RpZnkiOnt9LCJyZXF1aXJlIjp7fX0sInN0YXRlTmFtZXMiOlsicmVxdWlyZSIsIm1vZGlmeSIsImluaXQiLCJkZWZhdWx0IiwiaWdub3JlIl19LCJwYXRoc1RvU2NvcGVzIjp7fSwiZW1pdHRlciI6eyJfZXZlbnRzIjp7fSwiX2V2ZW50c0NvdW50IjowLCJfbWF4TGlzdGVuZXJzIjowfSwiJG9wdGlvbnMiOnRydWV9LCJpc05ldyI6ZmFsc2UsIl9kb2MiOnsiX192IjowLCJwYXNzd29yZCI6IiQyYSQxMCRnSjcwTUo2ejAwLkd4Vy52eGoueTB1dFJpU2VaZFdReENpOS94VHF5ZFhwblpLOW85S2pqeSIsInVzZXJuYW1lIjoiamVzdXMiLCJfaWQiOiI1YjZhOGRiNWJlZDU4ZDYzOWY2ZTUwNTYifSwiJGluaXQiOnRydWUsImlhdCI6MTUzMzc5MDIyNX0.if93hREIDf4gDxBdZCMafAyaneH-K9R1PQuk0Jsurx4" http://localhost:8000/api/client

### el endpoint http://localhost:8000/api/client soporta los metodos:

GET: devuelve la lista de clientes

POST: para crear un cliente, como parametros se pasan name, last_name y email
PUT: para actualizar un cliente, como parametros se pasan id, name, last_name y email

DELETE para borrar el cliente, como parametro se pasa el id del cliente

y http://localhost:8000/api/client/{mas el id del cliente}

GET para obtener al cliente por id

### todos deben de acompañarse con el header authorization y el token 8)

