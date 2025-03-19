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

Clona el repositorio y ejecuta:
```bash
npm install
```

## 🚀 Uso

Para ejecutar el programa usa:
```bash
npm run start
```
Y luego haz una petición **POST** a la API (local, debe tener una conexión a bd migrada):
```bash
curl -X POST http://localhost:3000/mutant -H "Content-Type: application/json" -d '{
  "dna": ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"]
}'
```

## 🌍 API Desplegada

El servicio ya está desplegado y disponible en línea. Puedes hacer una petición POST al siguiente endpoint:

```
https://magneto-dna-analyzer.onrender.com/mutant
```

Ejemplo de prueba con `curl`:

```bash
curl -X POST https://magneto-dna-analyzer.onrender.com/mutant -H "Content-Type: application/json" -d '{
  "dna": ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"]
}'
```

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
