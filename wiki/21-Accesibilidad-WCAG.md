# 21. Accesibilidad Web (WCAG 2.2)

## Objetivo
Evaluar y adecuar la interfaz de usuario de "Gestión de Horarios Universitarios" para garantizar que cumpla con los estándares internacionales de accesibilidad WCAG 2.2 Nivel AA. Esto asegura que la aplicación sea utilizable por la mayor cantidad de personas posible, incluyendo usuarios con discapacidades visuales, motoras o cognitivas.

## Metodología de Evaluación
Se utilizó una combinación de pruebas automatizadas (AXE y Lighthouse) y validación manual navegando exclusivamente por teclado y simulando lectores de pantalla.

### Checklist WCAG Validado

| Criterio | Descripción | Estado |
| :--- | :--- | :---: |
| **1.1.1 Contenido No Textual** | Las imágenes e iconos tienen un texto alternativo o están marcados como decorativos. | ✅ Cumple |
| **1.4.3 Contraste (Mínimo)** | El texto y las imágenes de texto tienen una relación de contraste de al menos 4.5:1. | ✅ Cumple |
| **2.1.1 Teclado** | Toda la funcionalidad del contenido es operable a través de una interfaz de teclado. | ✅ Cumple |
| **2.4.3 Orden del Foco** | Los componentes reciben el foco en un orden que preserva el significado y la operatividad. | ✅ Cumple |
| **2.4.7 Foco Visible** | Cualquier interfaz operable por teclado tiene un modo de operación donde el indicador de foco es visible. | ✅ Cumple |
| **3.3.2 Etiquetas o Instrucciones** | Se proporcionan etiquetas para cuando el contenido requiere introducción de datos. | ✅ Cumple |
| **4.1.2 Nombre, Función, Valor** | Para todos los componentes de la IU, el nombre y la función pueden ser determinados por software (ARIA). | ✅ Cumple |

## Fallos Detectados y Correcciones Implementadas

Durante la auditoría inicial, se encontraron las siguientes barreras de accesibilidad que fueron subsanadas en el código fuente:

### 1. Ausencia de Relación Semántica en Formularios (Label-Input)
- **Problema:** Los campos de texto en `Inicio.tsx` (Nombre, Correo, Contraseña) tenían etiquetas (`<label>`) pero no estaban vinculadas programáticamente a los inputs, lo que confunde a los lectores de pantalla (Screen Readers).
- **Corrección (Implementada):** Se asignaron atributos `id` únicos a cada `<input>` y se vincularon explícitamente mediante el atributo `htmlFor` en los `<label>`. También se añadió `aria-required="true"`.
- **Evidencia Técnica:**
  ```jsx
  <label htmlFor="email" className="form-label">Correo electrónico</label>
  <input id="email" type="email" aria-required="true" required />
  ```

### 2. Botones de Icono sin Texto Accesible (Aria-Labels)
- **Problema:** El botón de "Inicio de sesión con Google" y el enlace de "¿Olvidaste tu contraseña?" no proveían suficiente contexto si eran leídos fuera de flujo por un lector de pantalla.
- **Corrección (Implementada):** Se añadieron descriptores `aria-label` detallados a los enlaces y botones que realizan acciones clave.
- **Evidencia Técnica:**
  ```jsx
  <button aria-label="Continuar sesión con Google" onClick={handleGoogleLogin}>
    {/* SVG Icon */}
  </button>
  ```

### 3. Contraste de Foco y Navegación (CSS)
- **Problema:** El contraste de color en modo noche para los textos tenues (`var(--text-muted)`) no alcanzaba el umbral de 4.5:1. Al navegar por teclado (`Tab`), algunos botones no mostraban un anillo de foco visible, rompiendo la regla 2.4.7.
- **Corrección (Implementada):** Los estilos CSS fueron ajustados, implementando `:focus-visible` explícito para asegurar un contorno perimetral (Outline) que cumpla con los estándares AAA y ajustes cromáticos para contraste.

## Conclusión
La interfaz web supera los requisitos de accesibilidad mínimos requeridos en el estándar WCAG 2.2 AA. El soporte para navegación sin ratón y lectura semántica fue comprobado en el árbol de accesibilidad del DOM, asegurando un entorno inclusivo para toda la comunidad académica.
