import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';
import type { NodoArbolCSP } from './resolvedorCliente';

export async function guardarArbolCspEnFirebase(
  arbol: NodoArbolCSP,
  estadisticas: { tiempoTotalMs: number; nodosExplorados: number; retrocesos: number },
): Promise<string | null> {
  try {
    const logRef = collection(db, 'csp_execution_trees');
    const docRef = await addDoc(logRef, {
      fecha: serverTimestamp(),
      estadisticas,
      arbol, // El árbol se guarda como un objeto JSON anidado
    });
    console.log('Árbol CSP guardado exitosamente con ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error al guardar el árbol CSP en Firebase:', error);
    return null;
  }
}
