# Registro de Supuestos y Restricciones

## 1. Supuestos (Assumptions)
Hechos, eventos o circunstancias que consideramos verdaderos para el propósito de la planificación del proyecto:
* **S1 - Simplificaciones de modelo:** Se asume que las ventanas de disponibilidad de los docentes serán entregadas en bloques horarios cerrados discretos (ej. 2-4 PM) que no cambiarán impredeciblemente a mitad del periodo académico.
* **S2 - Recursos de Dominio:** Se supone que todas las aulas están estandarizadas a menos que el curso dicte el requisito de un "Laboratorio" específico.
* **S3 - Requisitos de Matrícula:** Se asume que la regla límite legal de créditos (20-22) debe ser mandatoria y una restricción dura en el sistema algorítmico, previniendo excepciones operativas.
* **S4 - Disponibilidad Tecnológica:** El proyecto será validado a nivel académico y soportado sin requerir de clústeres cloud costosos inmediatamente, pudiendo ejecutarse de manera óptima usando motores lógicos de navegador y servidores web livianos.

## 2. Restricciones (Constraints)
Factores que limitan las opciones o alcance del equipo en la toma de decisiones:
* **R1 - Computacionales (Técnica):** El modelo combinatorio es inherentemente exponencial; la capacidad de procesamiento de un computador doméstico restringe el volumen total masivo de variables, forzando la implementación de algoritmos de optimización estrictos (Forward Checking/MRV) para converger en un tiempo aceptable (criterio de rendimiento).
* **R2 - Económicas:** Todo el software desarrollado y herramientas empleadas para construcción y testing deben ser de código abierto libres de costo (open-source).
* **R3 - Sociales/Operativas:** El horario resultante debe garantizar siempre el no-solapamiento y tratar equitativamente las prioridades de los estudiantes (sin sesgos discriminatorios programados en las variables).
* **R4 - Ambientales (Green Software):** El consumo en latencia y recursos de cálculo debe ser justificado, el algoritmo no debe desperdiciar cómputo innecesariamente buscando toda posible combinación mediante "fuerza bruta".
* **R5 - Seguridad:** Está prohibido exponer llanamente datos de estudiantes o maestros al aplicar los estándares mínimos de la guía OWASP.
* **R6 - Restricción Académica de Plazo:** El desarrollo en su totalidad debe estar terminado para la fecha límite de clausura de la asignatura taller.
