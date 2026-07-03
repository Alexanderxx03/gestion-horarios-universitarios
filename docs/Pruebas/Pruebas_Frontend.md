# Pruebas de Software - Capa Frontend (React / Vite)

## 1. Estrategia y Filosofía de Pruebas (Testing Strategy)

El frontend de **UniHorarios** es una Single Page Application (SPA) altamente dinámica construida con React.js. Dado que gestiona estados complejos globales (Context API), ruteos asíncronos y consumo intensivo de APIs externas, depender de un equipo de QA (Quality Assurance) para realizar *Smoke Tests* manuales cada vez que un desarrollador integra nuevo código resultaría financieramente y operativamente inviable.

Por tal motivo, el equipo implementó la doctrina del **Test-Driven Development (TDD)** parcial y **Behavior-Driven Development (BDD)** apoyado por la herramienta **Vitest** (seleccionada por su altísima velocidad de ejecución y compatibilidad nativa con el motor ESM de Vite) y **React Testing Library** (RTL). La filosofía central que guía estas pruebas, defendida originalmente por Kent C. Dodds (creador de RTL), es simple pero radical: 

> *"Cuanto más se parezcan tus pruebas a la manera en que el software es utilizado, más confianza podrán darte."*

En lugar de verificar si el componente reactivo modificó su propiedad interna `state.modalOpen` a `true`, la prueba interactúa directamente con el DOM (`fireEvent.click`) e interroga si el texto "Confirmar Acción" se hizo visible para el usuario (`toBeInTheDocument()`). Esto garantiza que el código sea refactorizable sin romper las pruebas (Test Resilience).

---

## 2. Casos de Prueba Detallados (Test Cases Matrix)

La siguiente tabla consolida los principales escenarios de prueba que fueron automatizados. Esta matriz de trazabilidad asegura que los requerimientos funcionales más críticos de la capa de interfaz están cubiertos.

### 2.1 Módulo de Autenticación y Autorización (`Login.tsx`, `useAuth.ts`)

| ID de Prueba | Escenario / Comportamiento Esperado (BDD) | Datos de Entrada (Mock) | Aserción y Resultado (Expected) | Estado |
|:---:|:---|:---|:---|:---:|
| **FE-AUTH-01** | `Renderizado Inicial:` Debe cargar el formulario de Login con los campos requeridos vacíos. | Ninguno | Existen los campos "Email", "Password" y el botón "Iniciar Sesión" (Deshabilitado). | ✅ PASSED |
| **FE-AUTH-02** | `Validación de Cliente:` No debe permitir el envío de un correo con formato inválido (sin @). | Email: "juanperez.com" | Muestra un texto de error en rojo: "Formato de correo inválido". | ✅ PASSED |
| **FE-AUTH-03** | `Flujo de Éxito (Happy Path):` Redirige al Dashboard correcto tras autenticación exitosa. | `user: admin@uni.edu`, JWT Mockeado con Rol "COORDINADOR". | Llama a `navigate('/dashboard')` e invoca al Context para setear usuario. | ✅ PASSED |
| **FE-AUTH-04** | `Manejo de Errores (Sad Path):` Muestra alerta visual si las credenciales son rechazadas por el backend. | MSW retorna HTTP 401. | Aparece componente Toast rojo: "Credenciales Incorrectas". | ✅ PASSED |

### 2.2 Módulo de Gestión de Aulas y Mallas (`AulasList.tsx`, `MallasManager.tsx`)

| ID de Prueba | Escenario / Comportamiento Esperado (BDD) | Datos de Entrada (Mock) | Aserción y Resultado (Expected) | Estado |
|:---:|:---|:---|:---|:---:|
| **FE-AUL-01** | `Muestra de Datos (Read):` El componente debe renderizar correctamente una tabla de Aulas obtenidas del servidor. | Array simulado `[{id:1, name:'A101', capacity: 30}]` retornado por MSW. | El documento cuenta con una fila conteniendo el texto "A101" y "30". | ✅ PASSED |
| **FE-AUL-02** | `Estado de Carga (Loading State):` Debe mostrar un Skeleton (Esqueleto de carga) mientras se espera la respuesta de red. | MSW configurado con un delay de `1000ms`. | El componente `SkeletonLoader` se encuentra montado en el DOM. | ✅ PASSED |
| **FE-AUL-03** | `Estado Vacío (Empty State):` Muestra un mensaje amigable cuando la universidad aún no tiene aulas registradas. | Array vacío `[]` retornado por MSW. | Texto en pantalla: "No hay aulas registradas en el sistema". | ✅ PASSED |
| **FE-MAL-01** | `Cascada de Dependencias:` Inactivar un Curso padre (Prerrequisito) debe inhabilitar visualmente sus cursos hijos. | `toggleActive(cursoId: 4)` | El curso de ID 5 recibe una clase CSS `opacity-50` y cursor bloqueado. | ✅ PASSED |

### 2.3 Módulo de Lógica Pura y Helper Functions (`horarios.ts`)

No todas las pruebas en React requieren el montaje del DOM virtual. Las funciones de validación lógica se prueban como Javascript puro (Pruebas Unitarias Estrictas).

| ID de Prueba | Función Objetivo | Escenario (Caso Borde Evaluado) | Resultado (Expected vs Actual) | Estado |
|:---:|:---|:---|:---|:---:|
| **FE-HLP-01** | `isTimeOverlapping()` | Comparar `08:00-10:00` contra `10:00-12:00` (Frontera exacta). | Retorna `FALSE`. (Actual: `FALSE`) | ✅ PASSED |
| **FE-HLP-02** | `isTimeOverlapping()` | Comparar `08:00-10:00` contra `09:30-11:00` (Intersección parcial). | Retorna `TRUE`. (Actual: `TRUE`) | ✅ PASSED |
| **FE-HLP-03** | `calculateTotalCredits()`| Sumar array con 5 cursos de 4 créditos cada uno. | Retorna `20`. (Actual: `20`) | ✅ PASSED |
| **FE-HLP-04** | `calculateTotalCredits()`| Intentar sumar un array vacío (Sin cursos matriculados). | Retorna `0`. (Actual: `0`) | ✅ PASSED |

---

## 3. Arquitectura de Simulación (Mocking con MSW)

Realizar pruebas de frontend acopladas a un backend real en desarrollo genera un fenómeno conocido como *Pruebas Quebradizas (Flaky Tests)*. Si la base de datos se cae, la prueba de React falla, arrojando falsos negativos (el frontend funcionaba bien, fue el backend el que falló).

Para aislar el cliente de manera absoluta, se adoptó **MSW (Mock Service Worker)**. Esta maravilla tecnológica utiliza los `Service Workers` nativos del navegador (o jsdom) para interceptar solicitudes de red (`fetch` o `axios`) a nivel de sistema operativo y devolver respuestas prefabricadas de manera instantánea.

### Fragmento de Código: Configuración de Interceptor MSW
```typescript
// frontend/tests/mocks/handlers.ts
import { rest } from 'msw'

export const handlers = [
  // Interceptamos la petición real al endpoint de login
  rest.post('/api/v1/auth/login', (req, res, ctx) => {
    // Si la prueba envía credenciales malas, forzamos un 401
    if (req.body.email === 'malo@test.com') {
      return res(ctx.status(401), ctx.json({ error: 'Fallo simulado' }))
    }
    // Si son buenas, le devolvemos un token exitoso (HTTP 200)
    return res(
      ctx.status(200),
      ctx.json({ token: 'mocked_jwt_token_xyz', role: 'ADMIN' })
    )
  })
]
```

## 4. Conclusión del Ciclo de Pruebas Reactivas
La cobertura de la aplicación Frontend ha sido asegurada. Los módulos críticos de negocio responden correctamente ante inyecciones de datos corruptos, los *Loading States* impiden a los usuarios presionar botones múltiples veces (mitigando *Race Conditions*) y la lógica de renderizado se encuentra blindada contra refactorizaciones futuras gracias a la barrera impuesta por Vitest.
