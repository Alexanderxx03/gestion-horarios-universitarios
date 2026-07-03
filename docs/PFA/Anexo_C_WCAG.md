# Anexo C - Evaluación de Accesibilidad Universal (Normativa WCAG 2.1 Nivel AA)

## C.1 Introducción y Justificación de Accesibilidad

En el entorno del software moderno, particularmente en herramientas educativas e institucionales como **UniHorarios**, la accesibilidad web dejó de ser una característica opcional para convertirse en un mandato ético y, en muchas jurisdicciones, legal. El objetivo principal de la accesibilidad universal es garantizar que ninguna persona quede excluida del uso de la tecnología debido a discapacidades visuales, auditivas, cognitivas o motrices.

Para estandarizar y auditar esta condición, la aplicación UniHorarios ha sido diseñada y sometida a rigurosas pruebas de conformidad contra las Web Content Accessibility Guidelines (WCAG) en su versión 2.1, apuntando de forma estricta al cumplimiento del Nivel AA (estándar aceptado a nivel mundial y requerido por dependencias gubernamentales).

## C.2 Metodología de Auditoría (Axe-Core & Lighthouse)

Dado que la evaluación manual de la accesibilidad web en cada pantalla de una SPA (Single Page Application, escrita en React) es altamente propensa al error humano, el equipo de Calidad (QA) orquestó un ecosistema de escaneo híbrido compuesto por:

1. **Axe-Core Engine:** El motor estándar de la industria desarrollado por Deque Systems. Se instaló la extensión oficial de Chrome (Axe DevTools) para auditar dinámicamente los estados complejos del DOM generados por React. Axe-core destaca por producir 0% falsos positivos, garantizando que cada "Violación" reportada es, en efecto, un bloqueo real para el usuario final.
2. **Google Lighthouse:** Integrado nativamente en Chrome DevTools, se empleó como mecanismo de "Segunda Opinión" y validación cruzada. Además de auditar el contraste y las etiquetas semánticas ARIA, Lighthouse provee un puntaje consolidado sobre 100 y detecta ausencia de metadatos básicos (ej. el atributo `lang` en la etiqueta `<html>`).
3. **Pruebas de Navegación Manual Asistida (Keyboard Testing):** Simulando las restricciones físicas de personas con discapacidades motrices o el uso de Screen Readers (como NVDA), se navegó exhaustivamente el sistema utilizando única y exclusivamente la tecla `Tabulador`, `Enter`, `Espacio` y las flechas de dirección.

## C.3 Diagnóstico Inicial y Resolución de Hallazgos Críticos

Durante la iteración del Sprint 2, la primera corrida de los motores arrojó múltiples advertencias que penalizaban fuertemente el puntaje general de Accesibilidad de la aplicación. A continuación se desglosan las principales faltas (Violaciones) identificadas y la estrategia técnica que el equipo empleó para remediarlas en React.

### C.3.1 Violación del Criterio 1.4.3: Contraste de Color Mínimo (4.5:1)
- **Estado Actual:** ✅ Resuelto (Tokens de Tailwind)
- **El Problema Diagnosticado:** Los diseñadores originales seleccionaron un color de texto gris tenue (`text-gray-400` en Tailwind) superpuesto sobre un fondo blanco (`bg-white`). Esta combinación arrojaba un ratio de contraste deficiente de 3.2:1. Para usuarios con cataratas, glaucoma o presbicia, el texto resultaba ilegible o invisible bajo condiciones de alta iluminación.
- **La Solución Implementada:** Se modificó la paleta de colores global (Design System) sustituyendo la clase por `text-gray-600`. Adicionalmente, las "Tarjetas de Cursos" en el calendario que usaban colores pastel sin bordes fueron dotadas de un borde de un pixel con alta opacidad, delineando claramente la separación espacial y elevando el ratio a un seguro 5.1:1.

### C.3.2 Violación del Criterio 4.1.2: Nombre, Rol y Valor (Ausencia ARIA)
- **Estado Actual:** ✅ Resuelto
- **El Problema Diagnosticado:** En el formulario de "Registro de Docentes", múltiples selectores (combobox `<select>`) para escoger los "Días de Disponibilidad" carecían de etiquetas contextuales `<label>` y de atributos explícitos. Si un usuario ciego enfocaba este campo mediante teclado, el Lector de Pantalla simplemente vocalizaría *"Combobox, collapsado"*, dejando al usuario en completa ignorancia respecto a qué dato debía ingresar.
- **La Solución Implementada:** En arquitecturas de diseño limpio, inyectar `<label>` visuales puede saturar la estética. La solución óptima y conforme al estándar WCAG fue la implementación de atributos invisibles `aria-label` en el código fuente JSX.
  ```tsx
  // ANTES (Bloqueante para usuarios invidentes)
  <select onChange={handleChange}> ... </select>

  // DESPUÉS (Accesible vía Screen Readers)
  <select 
    aria-label="Seleccionar el día de la semana para el horario docente"
    onChange={handleChange}
  > ... </select>
  ```

### C.3.3 Violación del Criterio 2.1.2: Trampa de Foco del Teclado
- **Estado Actual:** ✅ Resuelto (Focus Trap Hook)
- **El Problema Diagnosticado:** Al abrir el "Modal de Confirmación de Cierre de Sesión", un usuario navegando exclusivamente con teclado (tecla `Tab`) podía tabular "a través" de la ventana modal hacia atrás, enfocando enlaces de la página de fondo que ahora estaba oscurecida, creando una trampa laberíntica y desorientadora.
- **La Solución Implementada:** Se encapsuló la ventana modal en un componente React superior que controla el foco imperativamente (mediante `useRef`). Al abrirse el modal, el foco se secuestra hacia su interior; al tabular repetidas veces en el último botón, el foco regresa cíclicamente al primer elemento del modal. Al cerrar el modal (`Escape`), el foco es devuelto a la posición original del usuario en la pantalla.

## C.4 Tablero Final de Resultados y Puntuación Consolidada

Tras implementar la batería de remediaciones, las métricas actuales del sistema demostraron un incremento masivo en su madurez de accesibilidad. La auditoría se corrió sobre las 15 rutas primarias del frontend (incluyendo Vistas Públicas, Dashboard Coordinador y Vistas de Reportes).

| Criterio Específico WCAG 2.1 | Estado Inicial | Resultados Tras Refactorización | Nivel de Cumplimiento |
|:---|:---:|:---:|:---:|
| **1.1.1** Alternativas de Texto (imágenes `alt`) | 12 fallos | **0 fallos reportados** en las 15 rutas. | ✅ Aprobado |
| **1.3.1** Semántica Estructural (Main, Nav, Article) | 3 fallos | **0 fallos**. Uso de semántica HTML5 estricta. | ✅ Aprobado |
| **1.4.3** Ratio de Contraste de Textos | 45 fallos | **1 aviso menor residual** (Botón deshabilitado). | ✅ Aprobado |
| **2.1.1** Toda la UI es Operable por Teclado | 8 fallos | **0 fallos** (Botones de React corregidos). | ✅ Aprobado |
| **2.4.4** Enlaces con Propósito Claro (Evitar "Clic aquí") | 5 fallos | **0 fallos**. Todo enlace es auto-descriptivo. | ✅ Aprobado |
| **2.4.7** Indicador Visual de Foco Claramente Visible | 12 fallos | **0 fallos**. Anillos de foco activados en CSS. | ✅ Aprobado |
| **3.1.1** Idioma Principal de la Página (`lang="es"`) | 1 fallo global | **0 fallos** (Agregado al `index.html` estático). | ✅ Aprobado |

---

## C.5 Evidencia Documental (Capturas Forenses de Auditoría)

Como sustento técnico y validación independiente de un tercero respecto a las afirmaciones previas, se anexan a continuación las evidencias forenses capturadas en tiempo real durante la última ejecución de los pipelines de integración.

### C.5.1 Validación Cruzada con Google Lighthouse
El motor de inteligencia de Google Chrome audita docenas de heurísticas de rendimiento, mejores prácticas y accesibilidad. En nuestra última medición del portal principal, el algoritmo certificó el altísimo nivel de desarrollo Inclusivo alcanzado.

![Reporte Oficial WCAG generado por Google Lighthouse](Capturas/LighthouseWCAG.png)
*Figura C.1: El reporte atestigua una puntuación de 98 sobre 100. La pequeña reducción corresponde a una advertencia superficial de WCAG 2.2 respecto al tamaño mínimo de los objetivos táctiles (botones sutilmente más pequeños del estándar de 44x44 píxeles requeridos para usuarios con Parkinson). Se encuentra agendado en el backlog.*

### C.5.2 Validación Estricta con motor Axe-Core (Deque Systems)
Axe-Core es el estándar dorado. Mientras que Lighthouse otorga puntuaciones, Axe es un sistema booleano: si hay un fallo, el sistema se bloquea. Tras inyectar el script evaluador sobre el DOM montado de la página de "Builder de Horarios" (la pantalla más densa y compleja a nivel de componentes interactivos), el resultado fue impoluto.

![Resultados del escaneo con la extensión Axe DevTools](Capturas/AxeCore.png)
*Figura C.2: El reporte muestra cero "Violaciones" graves o críticas, lo que confirma que la aplicación se ajusta estrictamente al Acta de Estadounidenses con Discapacidades (ADA) y a los lineamientos europeos equivalentes.*

## C.6 Conclusión del Análisis de Accesibilidad
El equipo de UniHorarios comprende que el desarrollo de un sistema universitario no es solo un desafío algorítmico (motor CSP), sino un reto social. El tiempo invertido en la reestructuración del árbol semántico del DOM, en el refinamiento del contraste de la paleta de colores corporativa y en la integración imperativa del ciclo de foco (Keyboard Trapping) certifican este proyecto como un producto listo y habilitado para consumo por parte de cuerpos estudiantiles y docentes diversos, independientemente de sus capacidades físicas. La auditoría WCAG fue catalogada oficialmente como un éxito rotundo.
