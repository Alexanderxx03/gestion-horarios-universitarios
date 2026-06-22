# 06 · Roles y Funcionalidades del Sistema

## Modelo de Roles

El sistema implementa **Control de Acceso Basado en Roles (RBAC)** con 4 roles jerárquicos almacenados como **Firebase Auth Custom Claims**.

```
ADMIN
  └── COORDINATOR
        ├── TEACHER
        └── STUDENT
```

---

## Matriz de Permisos

### Gestión de Usuarios

| Acción | ADMIN | COORDINATOR | TEACHER | STUDENT |
|---|:---:|:---:|:---:|:---:|
| Ver todos los usuarios | ✅ | ❌ | ❌ | ❌ |
| Crear usuarios | ✅ | ❌ | ❌ | ❌ |
| Editar rol de usuarios | ✅ | ❌ | ❌ | ❌ |
| Ver su propio perfil | ✅ | ✅ | ✅ | ✅ |
| Editar su propio perfil | ✅ | ✅ | ✅ | ✅ |
| Desactivar usuarios | ✅ | ❌ | ❌ | ❌ |

### Catálogo Académico (Cursos, Docentes, Aulas)

| Acción | ADMIN | COORDINATOR | TEACHER | STUDENT |
|---|:---:|:---:|:---:|:---:|
| Ver catálogo de cursos | ✅ | ✅ | ✅ | ✅ |
| Crear / Editar cursos | ✅ | ✅ | ❌ | ❌ |
| Eliminar cursos | ✅ | ✅ | ❌ | ❌ |
| Ver lista de docentes | ✅ | ✅ | ✅ | ❌ |
| Gestionar perfil docente | ✅ | ✅ | Solo propio | ❌ |
| Registrar disponibilidad | ✅ | ✅ | ✅ (propia) | ❌ |
| Ver aulas | ✅ | ✅ | ✅ | ✅ |
| Gestionar aulas | ✅ | ✅ | ❌ | ❌ |

### Períodos Académicos

| Acción | ADMIN | COORDINATOR | TEACHER | STUDENT |
|---|:---:|:---:|:---:|:---:|
| Crear período académico | ✅ | ❌ | ❌ | ❌ |
| Activar / cerrar período | ✅ | ❌ | ❌ | ❌ |
| Ver período activo | ✅ | ✅ | ✅ | ✅ |

### Matrícula

| Acción | ADMIN | COORDINATOR | TEACHER | STUDENT |
|---|:---:|:---:|:---:|:---:|
| Ver todas las matrículas | ✅ | ✅ | ❌ | ❌ |
| Crear matrícula | ✅ | ✅ | ❌ | ✅ (propia) |
| Validar matrícula | ✅ | ✅ | ❌ | ❌ |
| Cancelar matrícula | ✅ | ✅ | ❌ | ✅ (propia, pre-validación) |

### Generación de Horarios

| Acción | ADMIN | COORDINATOR | TEACHER | STUDENT |
|---|:---:|:---:|:---:|:---:|
| Activar generación CSP | ✅ | ✅ | ❌ | ❌ |
| Ver todos los horarios | ✅ | ✅ | ❌ | ❌ |
| Ver su horario personal | ✅ | ✅ | ✅ | ✅ |
| Exportar PDF | ✅ | ✅ | ✅ | ✅ |
| Exportar Excel | ✅ | ✅ | ✅ | ❌ |

---

## Pantallas por Rol

### 👤 ADMIN

| Pantalla | Descripción |
|---|---|
| `/admin/dashboard` | Resumen del sistema: usuarios, cursos, estado actual |
| `/admin/users` | CRUD completo de usuarios y asignación de roles |
| `/admin/periods` | Creación y gestión de períodos académicos |
| `/admin/config` | Configuración global del sistema |

### 📋 COORDINATOR

| Pantalla | Descripción |
|---|---|
| `/coordinator/dashboard` | Panel principal con estadísticas del período activo |
| `/coordinator/courses` | CRUD de cursos: código, nombre, créditos, prerrequisitos |
| `/coordinator/teachers` | Gestión de docentes y sus disponibilidades horarias |
| `/coordinator/classrooms` | Gestión de aulas: nombre, capacidad, tipo |
| `/coordinator/enrollments` | Revisión y validación de matrículas |
| `/coordinator/schedules` | Lanzar generación CSP, ver resultado, exportar |

### 👨‍🏫 TEACHER

| Pantalla | Descripción |
|---|---|
| `/teacher/profile` | Ver y actualizar sus datos personales |
| `/teacher/availability` | Registrar ventanas horarias de disponibilidad |
| `/teacher/schedule` | Ver su horario asignado en grilla semanal |

### 🎓 STUDENT

| Pantalla | Descripción |
|---|---|
| `/student/profile` | Ver su perfil y cursos aprobados |
| `/student/enrollment` | Seleccionar materias (valida créditos y prerrequisitos on-the-fly) |
| `/student/schedule` | Ver su horario personal en grilla semanal |

---

## Flujo de Usuario por Rol

### Flujo del Coordinador (caso principal)

```
1. Login con Google
   └──► Dashboard Coordinator
         ├── Configurar catálogo (cursos, docentes, aulas)
         │
         ├── Revisar matrículas de estudiantes
         │     └── Validar matrícula (Cloud Function: checkCredits + checkPrereqs)
         │
         └── Generar Horario
               └── Click "Generar Horario del Período"
                     └── Cloud Function: generateSchedule() [CSP Motor]
                           └── Mostrar grilla resultante
                                 └── Exportar PDF / Excel
```

### Flujo del Estudiante

```
1. Login con Google o Email
   └──► Dashboard Student
         └── Matrícula
               ├── Seleccionar cursos del período activo
               │     ├── Sistema valida: prerrequisitos aprobados ✅
               │     └── Sistema valida: créditos ≤ 22 ✅
               │
               ├── Confirmar matrícula
               │
               └── Ver Horario (una vez generado por Coordinator)
                     └── Exportar PDF personal
```

---

> 🔗 Anterior: [← Motor CSP](05-Motor-CSP) | Siguiente: [Requerimientos →](07-Requerimientos)
