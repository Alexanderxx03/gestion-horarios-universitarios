# 34. Documentación de Capacitación y Manuales Operativos

Como parte crítica del cierre del proyecto, este documento asegura la **transferencia de conocimiento** operativa, técnica y administrativa, dotando al cliente final (universidad) y al equipo de operaciones (DevOps) de la autonomía necesaria para mantener el sistema.

---

## 1. Transferencia Operativa: Equipo DevOps (Mantenimiento Técnico)

El proyecto está dockerizado para facilitar el *onboarding* de nuevos desarrolladores e ingenieros de sistema.

### Rutina de Despliegue Limpio (Local/Staging)
1. Clonar el repositorio master.
2. Configurar el archivo `.env` en el backend con la conexión a MongoDB (`MONGO_URI`).
3. Ejecutar comando orquestado:
   ```bash
   # Levanta MongoDB, Backend y Frontend concurrentemente
   docker-compose up --build -d
   ```
4. El sistema de bases de datos generará un *seed* inicial de datos ficticios automáticamente si las tablas están vacías.

### Resolución de Problemas Frecuentes (Troubleshooting)
- **Problema:** "Motor CSP devuelve Timeout Exception".
  - *Causa:* Restricciones mutuamente excluyentes imposibles de resolver matemáticamente (ej. Un docente solo tiene 2 horas disponibles, pero el curso exige 4).
  - *Solución Técnica:* Revisar la consola de logs administrativos donde el motor CSP emite un `ConstraintViolationLog` detallando las ID problemáticas.

---

## 2. Transferencia a Usuarios Clave: Manual de Administrador

Esta sección capacita al rol **COORDINATOR** o **ADMINISTRATOR**.

### A. Gestión del Catálogo Maestros
1. **Pestaña Aulas:** Ingrese la capacidad máxima física. El algoritmo CSP nunca superará este aforo en sus asignaciones.
2. **Pestaña Docentes:** Asegúrese de llenar rigurosamente la **Disponibilidad Horaria** de cada profesor. Si un profesor no tiene disponibilidad marcada, no recibirá cursos.

### B. Ejecución de la Generación de Horarios
1. Diríjase a **"Motor Inteligente > Generar Semestre"**.
2. Presione "Iniciar Cálculo Algorítmico".
3. **NOTA IMPORTANTE:** El sistema validará restricciones. Espere hasta 30 segundos mientras la barra de progreso evalúa combinaciones matemáticas. Al finalizar, la vista previa mostrará los colores semantizados de cada facultad.

---

## 3. Transferencia a Usuarios Finales: Manual del Estudiante

### A. Proceso de Matrícula
1. Inicie sesión mediante sus credenciales institucionales.
2. Navegue a **Mi Matrícula**. El sistema mostrará **exclusivamente** los cursos cuyos prerrequisitos usted ya haya aprobado.
3. El sistema bloqueará automáticamente el botón "Agregar" si usted supera los 22 créditos permitidos.

*Este documento certifica la viabilidad operativa y cierra la fase de entrega del conocimiento técnico al cliente, garantizando usabilidad a largo plazo.*
