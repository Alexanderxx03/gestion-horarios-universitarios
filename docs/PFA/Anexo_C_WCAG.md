# Anexo C - Evaluación de Accesibilidad (WCAG)

## C.1 Objetivo y metodología
Se evaluó el cumplimiento de las pautas de accesibilidad para el contenido web (WCAG 2.1 nivel AA) utilizando escaneos automatizados con `axe-core` y auditorías mediante `Lighthouse`.

## C.2 Resumen de hallazgos

| Criterio WCAG | Descripción | Hallazgos | Estado de Resolución |
|---|---|---|---|
| **1.1.1 (Non-text Content)** | Alternativas textuales para imágenes (`alt`) | 0 violaciones | ✅ Cumple (100%) |
| **1.3.1 (Info and Relationships)** | Etiquetas semánticas asociadas correctamente | 8 violaciones `<label>` sin ID | ✅ Resuelto en el Sprint 4 |
| **1.4.3 (Contrast - Minimum)** | Ratio de contraste de 4.5:1 | 3 violaciones por color primario | ✅ Resuelto (Tokens Tailwind) |
| **2.1.1 (Keyboard)** | Toda funcionalidad operada por teclado | 0 violaciones | ✅ Cumple (Focus Trap activo) |
| **4.1.2 (Name, Role, Value)** | Controles de UI accesibles para lectores de pantalla | 10 `<select>` sin `aria-label` | ✅ Resuelto mediante Atributos |

## C.3 Verificación Cruzada (Lighthouse)

Se realizaron pruebas con Lighthouse en 15 rutas críticas de la aplicación (incluyendo dashboards y vistas públicas).

- **Puntaje promedio de accesibilidad:** 98.4 / 100
- **Rutas sin violaciones:** 14/15
- **Ruta con causa residual:** La tarjeta de horario en `/schedule` aún presenta un ratio de contraste de 4.3:1 en el subtítulo (requerido: 4.5:1). Programado para corrección.

## C.4 Evidencia Visual

### Lighthouse Report
![Lighthouse WCAG Report](Capturas/LighthouseWCAG.png)
*Figura C.1: Puntaje de 98/100 otorgado por Google Lighthouse.*

### Axe-Core Scan
![Axe-Core Test](Capturas/AxeCore.png)
*Figura C.2: Resultado de la suite automatizada de accesibilidad indicando 0 violaciones graves.*
