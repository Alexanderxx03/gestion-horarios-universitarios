# Pruebas de Software - Capa Backend (Node.js / Express)

## 1. Justificación y Arquitectura de Pruebas (Backend)

La capa Backend es la fortaleza lógica del sistema UniHorarios. En el ecosistema Node.js (utilizando Express.js como motor HTTP y Mongoose/MongoDB como gestor de base de datos ORM), la mínima vulnerabilidad en un controlador puede traducirse en una filtración masiva de datos (Data Breach). Por consiguiente, la calidad aquí no es solo deseable; es matemáticamente obligatoria.

Para auditar y validar el comportamiento de nuestra API, se diseñó un laboratorio de pruebas empleando **Jest** (Testing Runner), **Supertest** (Inyector de Tráfico HTTP para aserciones de integración) y **MongoMemoryServer** (Una réplica de MongoDB que corre íntegramente en la memoria RAM volátil, garantizando velocidad y cero contaminación cruzada de datos).

El enfoque de pruebas Backend adoptado es la **Pirámide de Testing Invertida (Trofeo)**:
1. **Pocas Pruebas Unitarias Estrictas:** Ya que probar controladores mockeando (falseando) la base de datos no otorga confianza real sobre si el query de MongoDB estaba bien escrito o si los índices funcionaban.
2. **Abundantes Pruebas de Integración Aislada:** Donde inyectamos un payload HTTP real, dejamos que atraviese los middlewares de seguridad, el controlador y que efectivamente golpee la base de datos en RAM (In-Memory). Solo este enfoque holístico puede darnos garantía absoluta de que la arquitectura funciona en conjunto.

---

## 2. Catálogo Analítico de Casos de Prueba (Integration Matrix)

A continuación, se listan las especificaciones técnicas evaluadas en el ciclo del *Continuous Integration (CI)*. Estas pruebas operan destruyendo y levantando la base de datos entre cada corrida, asegurando condiciones iniciales idénticas.

### 2.1 Módulo de Seguridad e Interceptores (Middlewares JWT)

El primer anillo defensivo del servidor son sus middlewares. Si estos fallan, el controlador más robusto será vulnerado.

| ID Prueba | Descripción del Vector de Ataque | Parámetros Inyectados (Supertest) | Aserción Esperada | Estado |
|:---:|:---|:---|:---|:---:|
| **BE-SEC-01** | **Bloqueo Absoluto (Zero Trust):** Petición anónima hacia ruta protegida. | `GET /api/courses` (Sin enviar cabeceras) | `Status: 401 Unauthorized`. Propiedad `error: 'Token faltante'`. | ✅ PASSED |
| **BE-SEC-02** | **Invalidación Criptográfica:** Uso de un JWT caducado o firmado con otra clave secreta. | `GET /api/courses` (Token adulterado con base64). | `Status: 401 Unauthorized`. Error capturado por el decodificador de JSONWebToken. | ✅ PASSED |
| **BE-SEC-03** | **Violación de Privilegios:** Usuario raso intentando crear un curso. | `POST /api/courses` (Token válido pero `role='STUDENT'`). | `Status: 403 Forbidden`. Middleware de rol intercepta la petición antes de llegar al CRUD. | ✅ PASSED |

### 2.2 Módulo Crítico (CRUD Transaccional) - Cursos Académicos

| ID Prueba | Descripción del Escenario (BDD) | Parámetros Inyectados (Supertest) | Aserción Esperada | Estado |
|:---:|:---|:---|:---|:---:|
| **BE-CRUD-01** | **Persistencia Exitosa (Happy Path):** Alta de un curso válido. | `POST` con Body `{ name: 'Algoritmos', credits: 4, type: 'MANDATORY' }` | `Status: 201 Created`. MongoMemory verifica 1 documento nuevo y retorna el `_id`. | ✅ PASSED |
| **BE-CRUD-02** | **Validación Esquema Zod (Sad Path):** Inyección de un tipo de dato erróneo para romper la BD. | `POST` con Body `{ name: 1234, credits: 'cuatro', type: 'FALSO' }` | `Status: 400 Bad Request`. El middleware Zod aborta el proceso, devolviendo arreglo de validaciones estrictas. | ✅ PASSED |
| **BE-CRUD-03** | **Actualización Parcial Eficiente:** Editar solo los créditos de un curso existente. | `PATCH /api/courses/:id` con Body `{ credits: 5 }` | `Status: 200 OK`. Se comprueba que el `name` del curso no se vio sobreescrito o modificado a nulo accidentalmente. | ✅ PASSED |
| **BE-CRUD-04** | **Borrado Suave (Soft Delete):** Eliminar un curso. | `DELETE /api/courses/:id` | `Status: 204 No Content`. Una consulta posterior en DB retorna `active: false` (No se destruye el documento físico). | ✅ PASSED |

### 2.3 Manejo de Casos de Borde (Edge Cases) e Inconsistencias de BD

| ID Prueba | Descripción del Caso Extremo | Condiciones Forzadas en Memoria | Aserción Esperada | Estado |
|:---:|:---|:---|:---|:---:|
| **BE-ERR-01** | **Colisión de Índice Único (Duplicidad):** Intentar registrar un correo de docente que ya fue matriculado ayer. | Dos requests POST idénticos de forma consecutiva (mismo `email`). | El primer POST arroja `201`. El segundo POST debe fallar con `Status: 409 Conflict`, interceptando el error de MongoDB (código 11000). | ✅ PASSED |
| **BE-ERR-02** | **ID Ficticio (Not Found):** Modificar un recurso usando un ObjectId válido de Mongoose pero inexistente. | `PUT /api/aulas/5f8d0a55...` | `Status: 404 Not Found`. El sistema no debe explotar con un error 500 nulo. | ✅ PASSED |

---

## 3. Ejemplo Práctico de Laboratorio: Prueba de Integración (`users.test.ts`)

A modo de sustento académico de las aseveraciones previas, se adjunta el código fuente real simplificado de una prueba de integración representativa, evidenciando el poder de la dupla Jest + Supertest:

```typescript
describe('Controlador de Usuarios (Integration)', () => {
  it('Debería retornar 409 Conflict si el email del nuevo coordinador ya existe en MongoDB', async () => {
    // 1. Arrange (Preparar entorno y sembrar DB)
    await UserModel.create({
      email: 'admin@uni.edu',
      password: 'hashedpassword',
      role: 'COORDINADOR'
    });

    const tokenAdmin = generateTestToken({ role: 'ADMIN' });

    // 2. Act (Ejecutar inyección HTTP)
    const response = await request(app)
      .post('/api/v1/users')
      .set('Authorization', `Bearer ${tokenAdmin}`) // Bypass del auth middleware
      .send({
        email: 'admin@uni.edu', // INTENTO FRAUDULENTO (Duplicado)
        password: 'nuevapassword',
        role: 'DOCENTE'
      });

    // 3. Assert (Reclamar verdades absolutas)
    expect(response.status).toBe(409); // Validamos código de red
    expect(response.body.error).toContain('correo ya está registrado'); // Validamos usabilidad de error
  });
});
```

## 4. Veredicto Final de la Auditoría Backend
El servidor Node.js/Express demostró una resiliencia impecable frente a asaltos de datos corruptos. Al externalizar la capa de validación en la herramienta externa Zod, el código de los controladores Mongoose quedó extraordinariamente delgado y enfocado en transacciones de negocio. Las métricas confirman que la aplicación está arquitectónicamente preparada para pasar a la fase de estabilización final (Release Candidate).
