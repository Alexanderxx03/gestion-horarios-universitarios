# Informe de Estado del Proyecto - Cierre Sprint 4 (Final)

**Fecha de Corte (Status Date):** Viernes de la Semana 2 del Sprint 4 (Último Día)  
**Preparado por:** Alexander (Scrum Master / Lead Dev)  
**Audiencia (To):** Patrocinadores, Equipo de Desarrollo y Jurado Académico.

## 1. Resumen Ejecutivo Final (Executive Summary)

El Sprint 4 marcó el final del trayecto de desarrollo de UniHorarios. El enfoque dejó de ser la creación de funciones pesadas y pasó al embellecimiento (Front-end), aseguramiento de calidad (QA) y el paso formal a Producción. 
**El Proyecto está TERMINADO y en estado AZUL (Completado y Entregado).**

- **Velocidad Lograda (Burned Points):** 28/28 Story Points.
- **Burn-down final:** La línea llegó a Cero exacto el día Jueves por la tarde. El viernes solo se redactó documentación.

---

## 2. Logros Técnicos y Entregables Finales

La "Cereza del Pastel" ha sido colocada. El sistema pasó de arrojar feos textos JSON a una interfaz visual corporativa.

1. **La Grilla Interactiva (React-Big-Calendar):** Se integró la biblioteca visual. Ahora el coordinador navega por un calendario gigante codificado por colores (Azul para Teoría, Naranja para Laboratorio), que permite ver exactamente quién dicta, dónde y a qué hora.
2. **Impresión PDF (El Req-05 Creado):** A petición original de la Secretaria Administrativa (Sprint 0), Roberto logró inyectar `jspdf` y `html2canvas` para "tomar una foto" vectorial de la grilla de colores y descargarla instantáneamente en formato PDF apaisado, listo para imprimir.
3. **Muro DevOps de Seguridad:** Alexander instaló paquetes de mitigación como `helmet` (oculta cabeceras de servidor Express) y un `RateLimiter` que bloquea IPs si alguien intenta probar contraseñas locas más de 10 veces seguidas (Fuerza Bruta mitigada).
4. **Pruebas y SonarQube (Clean Code):** Se corrieron las herramientas de análisis estático (Ver Carpeta `docs/PFA`). Se redujo la Deuda Técnica de 5 horas a menos de 1 hora. Cobertura de tests unitarios estabilizada en 82%.

---

## 3. Incidentes Finales Vencidos (El Susto de Vercel)

Tuvimos un último micro-infarto durante el Despliegue de Producción:
- *Bloqueador de Despliegue:* Al apuntar el dominio final hacia Vercel, la aplicación de React colapsó lanzando pantalla blanca (White Screen of Death) y un error de "React Minified Error #152".
- *Resolución:* Un "Componente de Clase" heredado de la librería del Calendario estaba intentando leer el DOM antes de que React lo pintara. El equipo lo envolvió en un `useEffect` (Lazy load / Suspense) y parcheó el error en 40 minutos. El paso a producción se reanudó.

---

## 4. Estado Final del Proyecto y Próximos Pasos

Como Scrum Master, declaro el código base **"Feature Complete" (Características Completadas)**. 
- No se aceptarán más solicitudes de cambio, ni botones, ni colores nuevos. 
- Los repositorios de GitHub quedan cerrados para *Pull Requests* de desarrollo (Code Freeze Absoluto).
- La documentación del proyecto entra formalmente a su **Fase de Cierre**, preparando los manuales, actas de finalización y el material para la presentación de sustentación final (Pitch).

*Fin del Informe Semanal.*
