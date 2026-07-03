# Anexo E - Auditoría de Sostenibilidad Tecnológica (Green IT & Impacto Ambiental)

## E.1 El Paradigma de Green IT en la Ingeniería de Software

Históricamente, la Ingeniería de Software se ha centrado exclusivamente en el rendimiento, la escalabilidad y la fiabilidad (Tolerancia a fallos). Sin embargo, en el contexto del cambio climático actual, los Centros de Datos a nivel global consumen más del 1.5% de toda la electricidad producida en el planeta, cifra que proyecta multiplicarse. El paradigma **Green IT** (Tecnología de la Información Verde) impone un nuevo requerimiento no funcional crítico: minimizar la huella de carbono y el derroche energético derivado de los ciclos de cómputo ineficientes, el código inflado (Bloatware) y las transacciones de red redundantes.

En un ecosistema Cloud, donde se paga por ciclo de CPU y gigabyte transferido (AWS, GCP, Azure), diseñar para la sostenibilidad no es solo una postura ética, sino una estrategia directa de reducción de costos operativos (FinOps). El sistema **UniHorarios** asume esta responsabilidad desde su arquitectura base.

---

## E.2 Diagnóstico de Puntos Ciegos Energéticos (Hotspots)

Antes de trazar las estrategias de mitigación, el equipo identificó tres vectores de consumo energético masivo dentro de la naturaleza del producto:

1. **La Fricción Algorítmica (CSP):** El problema de generación de horarios (asignación de variables sujetas a múltiples restricciones cruzadas) es matemáticamente clasificado como NP-Hard. Sin control, un algoritmo ineficiente podría evaluar millones de permutaciones inválidas, monopolizando núcleos de servidor al 100% durante horas (desperdicio térmico masivo).
2. **Transferencia Serializada de Datos (Data Transfer):** Al momento de cargar un reporte global, intentar transmitir colecciones con decenas de miles de registros Json por la red incrementa dramáticamente el uso de antenas y repetidores (consumo eléctrico de telecomunicaciones).
3. **Imágenes de Despliegue Obesas (Container Bloat):** Empaquetar aplicaciones en contenedores Docker de tamaño excesivo obliga a descargar megabytes redundantes en cada iteración del pipeline CI/CD.

---

## E.3 Decisiones Arquitectónicas Sostenibles Implementadas

Para contrarrestar estos vectores, se aplicó un rediseño de código que maximiza la eficiencia (Lean Architecture):

### E.3.1 Estrategia 1: Profiling de CPU y Paralelismo en Node.js
Para mitigar el costo energético del algoritmo CSP (Constraint Satisfaction Problem), se tomaron dos medidas:
- **Heurísticas de Poda Temprana:** En lugar de utilizar fuerza bruta, el motor matemático evalúa primero las variables más restringidas (MRV: Minimum Remaining Values). Al "podar" ramas inválidas rápidamente, el servidor evita calcular operaciones inútiles, reduciendo un proceso que tardaba minutos a menos de **300 milisegundos**.
- **Worker Threads (Hilos Aislados):** En un modelo Node.js tradicional de un solo hilo, un proceso intensivo paralizaría el *Event Loop*. Se implementó el módulo nativo `worker_threads` para desviar la carga matemática pesada hacia un hilo secundario efímero. El hilo principal no se interrumpe y continúa atendiendo miles de peticiones ligeras concurrentes (I/O) sin requerir encender nuevos servidores de balanceo de carga.

### E.3.2 Estrategia 2: Eficiencia de Red y Ancho de Banda
Toda consulta masiva (por ejemplo, el historial de estudiantes o el catálogo de cursos) hacia la base de datos de MongoDB ha sido estrictamente refactorizada para implementar **Paginación del Lado del Servidor**.
- El Backend inyecta obligatoriamente operadores `skip` y `limit` en el pipeline de Mongoose.
- Se implementó *Payload Stripping* (Proyección). Mongoose solo solicita a la base de datos las columnas estrictamente necesarias (ej. `Course.find({}, { name: 1, credits: 1 })`), evitando enviar campos de *timestamps* y arreglos anidados pesados a través de la interfaz de red interna del servidor.

### E.3.3 Estrategia 3: Dieta de Contenedores (Docker Alpine)
Pensando en el futuro despliegue Cloud, los `Dockerfiles` del proyecto están configurados bajo el patrón *Multi-Stage Build* y fundamentados en la imagen oficial `node:18-alpine`. Al basarse en Alpine Linux, el tamaño del sistema operativo subyacente se recorta a escasos 5 MB (en contraste con los más de 200 MB de las distribuciones basadas en Debian/Ubuntu). Cada vez que el pipeline despliega una actualización, la nube transfiere y almacena menos masa de datos, requiriendo menos electricidad.

---

## E.4 Conclusión del Impacto Ambiental

Si bien **UniHorarios** nació como un proyecto académico con una escala de despliegue inicial modesta, el diseño arquitectónico de su código respira los principios del desarrollo sustentable. Al limitar rigurosamente el impacto procesal de los cálculos de NP-Hard, minimizar la transferencia de payloads innecesarios sobre el protocolo HTTP, y purgar las dependencias estáticas no utilizadas, el proyecto garantiza que, de ser escalado para el servicio de una universidad real de 30,000 estudiantes, operará bajo una huella de carbono radicalmente optimizada, alineándose sólidamente con el ODS N° 9 (Industria, Innovación e Infraestructura Sostenible).
