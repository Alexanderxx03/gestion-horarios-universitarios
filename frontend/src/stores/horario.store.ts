import { create } from 'zustand';
import type { Curso, Docente, Aula, AsignacionHorario, EstadoHorario } from '@/lib/tipos';
import { CURSOS_DEMO, DOCENTES_DEMO, AULAS_DEMO } from '@/lib/datosDemostracion';
import { resolverHorario } from '@/lib/resolvedorCliente';

interface EstadoHorarioStore {
  /* Datos del catálogo */
  cursos: Curso[];
  docentes: Docente[];
  aulas: Aula[];

  /* Estado del horario generado */
  estado: EstadoHorario;
  asignaciones: AsignacionHorario[];
  tiempoGeneracionMs: number;
  nodosExplorados: number;
  retrocesos: number;
  mensajeError: string | null;

  /* Acciones */
  generarHorario: () => void;
  reiniciarHorario: () => void;
  agregarCurso: (curso: Curso) => void;
  eliminarCurso: (id: string) => void;
  agregarDocente: (docente: Docente) => void;
  eliminarDocente: (id: string) => void;
  agregarAula: (aula: Aula) => void;
  eliminarAula: (id: string) => void;
}

export const useHorarioStore = create<EstadoHorarioStore>((set, get) => ({
  cursos: CURSOS_DEMO as Curso[],
  docentes: DOCENTES_DEMO as Docente[],
  aulas: AULAS_DEMO as Aula[],

  estado: 'inactivo',
  asignaciones: [],
  tiempoGeneracionMs: 0,
  nodosExplorados: 0,
  retrocesos: 0,
  mensajeError: null,

  generarHorario: () => {
    set({ estado: 'generando', mensajeError: null });

    // Ejecutar en un setTimeout para permitir que la UI muestre el estado "generando"
    setTimeout(() => {
      const { cursos, docentes, aulas } = get();
      const resultado = resolverHorario(cursos, docentes, aulas);

      if (resultado.exito) {
        set({
          estado: 'generado',
          asignaciones: resultado.asignaciones,
          tiempoGeneracionMs: resultado.estadisticas.tiempoTotalMs,
          nodosExplorados: resultado.estadisticas.nodosExplorados,
          retrocesos: resultado.estadisticas.retrocesos,
          mensajeError: null,
        });
      } else {
        set({
          estado: 'fallido',
          asignaciones: [],
          tiempoGeneracionMs: resultado.estadisticas.tiempoTotalMs,
          nodosExplorados: resultado.estadisticas.nodosExplorados,
          retrocesos: resultado.estadisticas.retrocesos,
          mensajeError:
            'No se encontró una asignación de horario válida con las restricciones actuales.',
        });
      }
    }, 500);
  },

  reiniciarHorario: () => {
    set({
      estado: 'inactivo',
      asignaciones: [],
      tiempoGeneracionMs: 0,
      nodosExplorados: 0,
      retrocesos: 0,
      mensajeError: null,
    });
  },

  agregarCurso: (curso) => set((s) => ({ cursos: [...s.cursos, curso] })),
  eliminarCurso: (id) => set((s) => ({ cursos: s.cursos.filter((c) => c.id !== id) })),
  agregarDocente: (docente) => set((s) => ({ docentes: [...s.docentes, docente] })),
  eliminarDocente: (id) => set((s) => ({ docentes: s.docentes.filter((d) => d.id !== id) })),
  agregarAula: (aula) => set((s) => ({ aulas: [...s.aulas, aula] })),
  eliminarAula: (id) => set((s) => ({ aulas: s.aulas.filter((a) => a.id !== id) })),
}));
