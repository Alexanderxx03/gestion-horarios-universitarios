# Sistema de Generación Óptima de Horarios Académicos

Este es el repositorio base oficial para el desarrollo del "Proyecto de Fin de Asignatura" (PFA) perteneciente al **Taller de Proyectos 2**. 

## Entregables de Documentación - Sprint 0
Todos los documentos solicitados para el inicio y formalización del proyecto (Sprint 0) han sido generados en la carpeta `docs/` y listos para revisión y sustentación:

1. [Enfoque del Proyecto](docs/1_Enfoque_del_Proyecto.md)
2. [Visión del Proyecto](docs/2_Vision_del_Proyecto.md)
3. [Project Charter](docs/3_Project_Charter.md)
4. [Supuestos y Restricciones](docs/4_Supuestos_y_Restricciones.md)
5. [Equipo del Proyecto](docs/5_Equipo_del_Proyecto.md)
6. [Análisis del Problema (Borrador)](docs/6_Analisis_del_Problema.md)
7. [Requerimientos Preliminares](docs/7_Requerimientos_Preliminares.md)

## Contexto Tecnológico (Próximos Sprints)
Este sistema se modelará sobre una arquitectura SPA + API REST usando tecnologías modernas (React y Node.js) priorizando el diseño, accesibilidad web, Green Software y seguridad (OWASP).

### Configuración Git
El repositorio para fines académicos ya se encuentra inicializado en local (`git init`).

## Restricciones Algorítmicas de Dominio
El proyecto resuelve un **Problema de Satisfacción de Restricciones (CSP)** cuidando:
- Evadir conflictos horarios (Docente/Aula/Hora).
- Vigilar el tope normativo de créditos de pregrado.
- Validación secuencial de cursos.
