# Pruebas End-to-End (E2E) - Orquestación Global del Sistema

## 1. Definición Teórica de Pruebas E2E en Sistemas Monorepo

Las pruebas unitarias y de integración aíslan los componentes (El frontend mockea el servidor, el backend mockea la base de datos). Sin embargo, ¿qué sucede cuando todas las piezas del rompecabezas se ensamblan en un entorno real? A menudo, discrepancias sutiles en los contratos de datos (una interfaz en TypeScript que esperaba un string y recibió un entero de MongoDB) pueden colapsar el sistema.

Para mitigar este riesgo, UniHorarios ejecuta **Pruebas End-to-End (De Extremo a Extremo)**. Estas pruebas levantan el Frontend (React), el Backend (Node.js), el Motor CSP (Worker Threads) y la Base de Datos (MongoDB) de manera simultánea en puertos locales, simulando las acciones de un usuario real utilizando un navegador controlado por un robot virtual. Para esta hazaña se empleó la herramienta **Playwright** o **Cypress** (para fines de automatización de navegador) junto a **Postman** (Colecciones automatizadas).

---

## 2. Escenarios Prácticos Ejecutados (Flujos Completos de Negocio)

En esta modalidad, no probamos funciones sueltas (`isTimeOverlapping`). Probamos **Viajes de Usuario (User Journeys)**.

### 2.1 E2E-Flow-1: Creación Transaccional Completa de un Nuevo Semestre
**Actor Simulado:** Coordinador Académico (Credenciales Administrativas).

| Paso a Paso Simulado (Robot) | Acción Técnica / Inyección | Respuesta Esperada en la Red |
|:---|:---|:---|
| **1. Autenticación** | Rellenar formulario de Login en React. Hacer clic en "Ingresar". | Petición `POST /auth`. Recepción de Token JWT. Redirección HTTP. |
| **2. Navegación a Mallas** | Hacer clic en "Nueva Malla". | Carga componente sin errores en Consola JS. |
| **3. Carga de Curso Base** | Rellenar formulario (Nombre: "Algoritmos", Créditos: "4", Tipo: "Obligatorio"). Clic "Guardar". | `POST /courses`. Servidor valida Zod, Mongoose guarda. Retorna `201 Created`. |
| **4. Validación Visual** | El Robot escanea el DOM (Árbol visual de React) en la tabla inferior. | El texto "Algoritmos" aparece reflejado en la tabla sin necesidad de refrescar la pantalla manual. |

### 2.2 E2E-Flow-2: Disparo del Motor Generador de Horarios (Test de Estrés UI/UX)
Este es el flujo más volátil del sistema debido a su asincronía prolongada.

**Actor Simulado:** Coordinador de Horarios.

| Paso a Paso Simulado (Robot) | Acción Técnica / Inyección | Respuesta Esperada en la Red |
|:---|:---|:---|
| **1. Selección de Parámetros** | Seleccionar Ciclo "V" y Presionar el gran botón azul: "Generar Horario Optimizado". | `POST /api/schedule/generate`. Se inician los Spinners de carga (UI). |
| **2. Polling Asíncrono** | El Frontend envía peticiones cada 1000ms al servidor preguntando por el estado. | Se recibe un estatus de `"PENDING"` o `"PROCESSING"` mientras el Worker CSP labora. |
| **3. Conclusión de Tarea** | El Worker Node.js finaliza e inserta en la BD. El Polling retorna 200. | Desaparece el Spinner. Se renderiza la Grilla (Calendario de React) llena de bloques de colores vivos. |
| **4. Verificación Estricta** | El Robot valida que ninguna celda de la columna "Lunes" entre las 08:00 y las 10:00 albergue dos elementos superpuestos (cruce visible). | Confirmación de integridad visual. |

---

## 3. Manejo de Errores a Nivel Red (Resiliencia)

Una prueba E2E de clase mundial debe garantizar que la interfaz gráfica no "explote" (Pantalla en blanco o *White Screen of Death* en React) si se interrumpe la conexión entre el cliente y el servidor en medio de una operación crítica.

### 3.1 E2E-Flow-3: Interrupción de Internet (Caída de Backend simulada)
- **Acción:** El usuario presiona guardar un nuevo Docente. El robot virtual simula un corte de red (`Offline Mode`).
- **Verificación:** El bloque `catch` del Axios (Librería HTTP) intercepta el error `NetworkError`. React no estalla; en cambio, el componente intercepta la excepción e imprime una Tostada (Toast/Snackbar) roja indicando al usuario: *"Error de conexión con el servidor. Intente más tarde"*. 
- **Estado de Resolución:** Completamente aprobado.

---

## 4. Conclusión del Aseguramiento de Calidad Global
La suite End-to-End certifica la orquestación armónica de las cuatro tecnologías principales del stack MERN. Garantiza que la comunicación inter-módulos y la deserialización de datos a través de JSON funciona a la perfección, proveyendo al usuario final la experiencia cohesiva e ininterrumpida delineada durante la Fase de Requisitos del Taller de Proyectos.
