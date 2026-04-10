# Lista Preliminar de Requerimientos (Funcionales y No Funcionales)

El presente sirve como inventario del Backlog básico aplicable sobre el núcleo del Sprint 0 a lo largo del desarrollo.

## Requerimientos Funcionales (RF)
* **RF01 - Administración del Catálogo (Inventario Base):** El sistema debe permitir el ingreso, edición y eliminación de metadatos de Docentes, Cursos y Aulas en un entorno controlado que sirva como fuente axiomática para el procesamiento posterior.
* **RF02 - Verificación de Reglas Académicas (Validación):** El sistema debe constatar operativamente que una prematricula cumpla que un estudiante detente los prerrequisitos correctos y esté contenido en el límite legal de la facultad (rango referenciado de 20 a 22 créditos sumativos).
* **RF03 - Activación de Generador CSP:** El sistema debe ostentar una UI/Componente que reciba un estímulo y solicite al sub-sistema backend computar el marco complejo a través del algoritmo y formular combinatorias.
* **RF04 - Visualizador de Distribución:** Una vez arrojada la matriz resuelta, debe trasladar la estructura JSON de la API hacia un mapeo visual amigable y tabulado de filas por horas, y los días en su respectiva columna horizontal, libre de superposiciones.

## Requerimientos No Funcionales (RNF)
En estricto cumplimiento con la "Gestión de Estándares Obligatorios" referenciada en la rúbrica central:

* **RNF01 - Usabilidad, Inclusión y Estética (WCAG & ISO 25010):** Todo componente de cara al usuario deberá ser responsivo, de alto rendimiento gráfico (Premium) pero compatible para herramientas de accesibilidad bajo protocolos ARIA W3C.
* **RNF02 - Adaptabilidad de Entorno/Portabilidad:** Debido al control ágil el aplicativo persistirá en un almacenamiento liviano e portable embebido; pudiendo transicionar sin esfuerzo refactorial masivo a un modelo productivo SQL cuando fuere imperativo.
* **RNF03 - Rendimiento e Inteligencia Combinatoria:** El motor lógico interno previene loops infinitos que agotan el heap. Cortará ejecución o reportará fallida si no hay una asignación probable garantizando la eficiencia bajo parámetros de ISO 25010 (Software Product Quality).
* **RNF04 - Seguridad en Trasmisión (OWASP Top 10):** Limpieza exhaustiva de todos los puntos de entrada, prevenciones Cross-Site Request Forgery y validación en API antes de llegar a la lógica pesada.
* **RNF05 - Sostenibilidad (Green Software):** Adoptar un marco asíncrono y de componentes de estado modular para asegurar que tanto Servidor como el terminal del cliente (ordenador) malgastan la mínima y estricta cantidad de energía energética en recursos de GPU y CPU.
