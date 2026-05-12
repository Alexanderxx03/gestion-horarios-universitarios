import type { NodoArbolCSP } from './resolvedorCliente';

export async function guardarArbolCspEnFirebase(
  arbol: NodoArbolCSP,
  estadisticas: { tiempoTotalMs: number; nodosExplorados: number; retrocesos: number },
): Promise<string | null> {
  try {
    const response = await fetch('http://localhost:5000/api/logs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        executionId: `csp_exec_${Date.now()}`,
        step: 1,
        message: 'Árbol de ejecución CSP',
        data: { estadisticas, arbol },
      }),
    });

    if (!response.ok) {
      throw new Error('Error en la respuesta del servidor');
    }

    const data = await response.json();
    console.log('Árbol CSP guardado exitosamente en MERN DB');
    return data.id || 'success';
  } catch (error) {
    console.error('Error al guardar el árbol CSP en MongoDB:', error);
    return null;
  }
}
