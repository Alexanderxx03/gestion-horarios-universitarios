# Anexo G - Documentación Exhaustiva de Pruebas Backend (Jest)

## G.1 Justificación Teórica de la Arquitectura de Pruebas (Backend)

La capa de aplicación (Backend en Node.js/Express) es el núcleo transaccional del sistema y el garante absoluto de la seguridad lógica (Zero Trust). El Frontend puede ser manipulado o eludido; el Backend no. Un fallo en los controladores podría causar corrupción masiva de datos en MongoDB, y un fallo en los Middlewares dejaría expuestos los perfiles de los usuarios y las planillas de los docentes.

Con el fin de garantizar el hermetismo y fiabilidad, se instrumentó una agresiva estrategia de Testing. Se seleccionó el framework **Jest** impulsado por la red social Facebook (por sus capacidades superiores de *Snapshot Testing*, aserciones profundas y aislamiento paralelo) y la librería **Supertest** para simular tráfico HTTP entrante sin requerir escuchar en un puerto de red físico (evitando conflictos del sistema operativo).

Adicionalmente, se optó por un paradigma de "Pruebas de Integración Aisladas", para lo cual se utilizó `mongodb-memory-server`. Esta dependencia crea una instancia volátil de MongoDB en memoria RAM, permitiendo probar las consultas complejas de Mongoose (`populate`, `aggregate`) con asombrosa velocidad, y destruyendo la base de datos al finalizar cada test para evitar colisiones de estado.

---

## G.2 Infraestructura de Laboratorio
- **Core de Testing:** Jest (Runner, Matcher, Mocker).
- **HTTP Client (Integration):** Supertest (para forjar peticiones `GET`, `POST`, `PUT`, `DELETE`).
- **Base de Datos Efímera:** `mongodb-memory-server` (Instancia in-memory, eliminando la necesidad de Docker durante las pruebas de integración).

---

## G.3 Métricas de Cobertura (Coverage Map)

Ejecutar `npm run test:coverage` (usando el motor Istanbul provisto nativamente por Jest) a través de todos los módulos del backend, arroja las siguientes métricas contundentes:

| KPI Cobertura de Backend | Métrica Obtenida | Análisis Arquitectónico |
|:---|:---:|:---|
| **Statements (Sentencias)** | 61.7% | Gran porción de los algoritmos lógicos se encuentra auditada. |
| **Branches (Condicionales)** | 45.2% | Área de debilidad. Se requiere probar más casos de borde (ej. `if (error instanceof ValidationError)`). |
| **Functions (Controladores)**| 68.9% | Sobresaliente. Casi el 70% de las rutas HTTP fueron conectadas en los tests. |
| **Lines (Líneas Reales)** | 61.7% | Espejo directo del KPI de sentencias declarativas. |

Las pruebas demuestran una confiabilidad innegable sobre las rutas "Happy Path" (caminos de éxito), dejando como principal meta testear los bloques `catch` de rechazo.

---

## G.4 Diseño Estratégico de Casos Críticos (Test Suites)

La suite ampara un volumen de **364 pruebas independientes** alojadas en 53 suites distintas. El diseño obedece al patrón AAA (*Arrange, Act, Assert*). A continuación se documentan los escenarios principales.

### G.4.1 Seguridad e Intercepción (Middlewares `auth.test.ts`)
1. **[Debe rechazar tráfico 401 si no se provee cabecera Authorization]**
   - *Acción:* `request(app).get('/api/protected-route')` (Sin adjuntar JWT).
   - *Aserción:* El código de estado HTTP (StatusCode) devuelto debe ser estrictamente `401 Unauthorized` y el cuerpo json debe poseer la propiedad `error`.
2. **[Debe rechazar tráfico 403 si el Rol JWT no tiene privilegios de ADMIN]**
   - *Acción:* Firma de un JWT mockeado con el rol `ESTUDIANTE` intentando golpear un endpoint de edición de cursos.
   - *Aserción:* El servidor debe interceptar, decodificar, validar y arrojar un `403 Forbidden`.

### G.4.2 Integración Transaccional (Controladores de Curso `course.test.ts`)
1. **[Debe crear un curso exitosamente en la DB con validaciones activas]**
   - *Acción:* Inyectar vía `POST` un payload JSON estructuralmente perfecto (`name`, `credits`, `type`).
   - *Aserción:* Supertest debe recibir un StatusCode `201 Created`. Acto seguido (Test de doble aserción), realizar un `Mongoose.findOne` buscando en el servidor de memoria y verificar que el documento fue persistido realmente en el *engine*.
2. **[Debe fallar (400 Bad Request) si el payload viola el esquema de Zod]**
   - *Acción:* Enviar un número negativo para el campo de `creditos`.
   - *Aserción:* El middleware de Zod debe interrumpir el flujo del pipeline (evitando tocar MongoDB) y vomitar un arreglo estandarizado de `ZodErrors` al cliente con estatus HTTP 400.

---

## G.5 Evidencia Técnica Consolidada

A modo de registro de validación, la salida terminal que genera el tablero ASCII con la disección carpeta por carpeta atestigua los porcentajes previamente declarados.

![Resultados Jest](Capturas/CoverageJest.png)
*Figura G.1: Impresión del motor de cobertura integrado en el pipeline, desglosando la confiabilidad por archivo e identificando qué líneas exactas (Uncovered Lines) fallaron en ejecutarse.*

## G.6 Identificación de Deficiencias Futuras
El equipo reconoce que la brecha en el rubro "Branches" (45.2%) surge porque históricamente se probaron los casos de éxito (creación y lectura correcta). El *Action Plan* para el Sprint Final requiere la creación de casos "Sad Path" (simulando, por ejemplo, que la base de datos devuelve un timeout, que el Token JWT esté expirado `TokenExpiredError`, o que la base de datos rechace un guardado por una violación del índice Único `DuplicateKey Error`). Alcanzar la meta institucional del 70% es prioridad número uno.
