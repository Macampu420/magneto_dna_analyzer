# 🧬 Magneto DNA Analyzer

Este proyecto es una API en **NestJS** que analiza secuencias de ADN para determinar si un individuo es mutante o humano.

## 📌 Funcionalidad

Dado un array de secuencias de ADN, el servicio verifica si existen al menos **dos secuencias de cuatro letras iguales** (en horizontal, vertical o diagonal).

### Ejemplo de entrada mutante:
```ts
const dna = ['ATGCGA', 'CAGTGC', 'TTATGT', 'AGAAGG', 'CCCCTA', 'TCACTG'];
service.isMutant(dna); // true
```

### Ejemplo de entrada humana:
```ts
const dna = ['TGCATG', 'AGTCCA', 'CAGTGC', 'TTATGT', 'AGATGG', 'TCACTG'];
service.isMutant(dna); // false
```

## 📦 Instalación

Clona el repositorio, configura las variables de entorno (que puedes encontrar en .env.example) y ejecuta:
```bash
pnpm install && npx prisma migrate dev
```

## 🚀 Uso

Para ejecutar el programa usa:
```bash
pnpm run start
```
Y luego haz una petición **POST** a la API:
```bash
curl -X POST http://localhost:3000/mutant -H "Content-Type: application/json" -d '{
  "dna": ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"]
}'
```

## 🌍 API Desplegada

El servicio ya está desplegado y disponible en línea. Puedes hacer una petición POST al siguiente endpoint:

```
https://bizarre-wandie-miguel-campuzano-cd22b0c4.koyeb.app/mutant
```

Ejemplo de prueba con `curl`:

```bash
curl -X POST https://bizarre-wandie-miguel-campuzano-cd22b0c4.koyeb.app/mutant -H "Content-Type: application/json" -d '{
  "dna": ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"]
}'
```

## 📖 Documentación de la API

La API está documentada con **Swagger**. Puedes acceder a la documentación interactiva en la siguiente URL:

```
https://bizarre-wandie-miguel-campuzano-cd22b0c4.koyeb.app/api
```


Esto te permitirá explorar y probar los endpoints de la API de manera interactiva.

## 📊 Endpoint de estadísticas

Además del endpoint /mutant, la API expone un endpoint /stats que devuelve información sobre las verificaciones de ADN almacenadas en la base de datos.

Ejemplo de respuesta:

```
{
  "count_mutant_dna": 40,
  "count_human_dna": 100,
  "ratio": 0.4
}
```

Puedes hacer una petición GET con:

```
curl -X GET https://bizarre-wandie-miguel-campuzano-cd22b0c4.koyeb.app/stats
```

## 💾 Persistencia de datos

La API almacena cada secuencia de ADN procesada en una base de datos PostgreSQL, utilizando Prisma como ORM. Se asegura que cada ADN solo se guarde una vez.

Los datos guardados incluyen:
-	Secuencia de ADN
-	Si es mutante o no
-	Fecha de análisis

## 🧪 Pruebas

Ejecuta las pruebas (unitarias y e2e) con:
```bash
npm run test:all
```

## ✅ Casos de prueba incluidos

- **Mutante detectado correctamente** ✔️  
- **Humano detectado correctamente** ✔️  
- **Secuencias inválidas (errores manejados)** 🚨
  - Caracteres no permitidos  
  - Matriz vacía  
  - Filas de diferentes longitudes  

## 👨‍💻 Autor

Este proyecto fue desarrollado por **Miguel Campuzano**, como parte de la preparación para la vacante como backend developer en Mercado Libre.
