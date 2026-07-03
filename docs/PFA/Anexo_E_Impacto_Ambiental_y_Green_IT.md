# Anexo E - Impacto Ambiental y Green IT

## E.1 Enfoque Green IT en UniHorarios
Como parte de nuestra responsabilidad profesional, el diseño de la arquitectura de la aplicación considera prácticas de "Green IT" para minimizar el impacto energético y de huella de carbono derivado de su operación en servidores en la nube.

## E.2 Optimización de Recursos (Eficiencia Computacional)
1. **Worker Threads para CPU Intensivo:** El motor CSP de generación de horarios consume alta CPU. Al confinarlo a hilos nativos (`Worker Threads`), evitamos el bloqueo del Event Loop de Node.js, reduciendo ciclos muertos y la necesidad de escalar la aplicación horizontalmente de manera innecesaria.
2. **Consultas Paginadas:** Todas las respuestas masivas de la API REST (como `/api/enrollments`) implementan los operadores `limit` y `skip` de MongoDB. Esto disminuye dramáticamente la cantidad de memoria RAM y Ancho de Banda consumidos.
3. **Imágenes Ligeras:** El Dockerfile del backend utiliza imágenes Alpine de Node.js (`node:18-alpine`), reduciendo el tamaño del contenedor y el consumo energético durante las transferencias de la canalización CI/CD.

## E.3 Conclusión de Impacto
Si bien UniHorarios es un proyecto académico de escala reducida, la inclusión de buenas prácticas arquitectónicas garantiza que en un futuro despliegue en un entorno universitario real, los costos energéticos y económicos de mantener los servidores estarán optimizados, alineándose con los ODS (Objetivos de Desarrollo Sostenible) de eficiencia tecnológica.
